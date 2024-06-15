import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ref, set, onValue, query, remove, update } from "firebase/database";
import { REALTIME_DATABASE, RD_PROJECT_NAME } from "../../firebase";
import Loader from "../components/loader";

type ItemProps = {
  id: string;
  name: string;
};

export default function RealtimeDatabasePage() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ItemProps[]>([]);
  const [name, setName] = useState("");

  const newItem = { id: uuidv4(), name };

  // CREATE
  function craateItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    set(ref(REALTIME_DATABASE, RD_PROJECT_NAME + newItem.id), {
      name: newItem.name,
    });
    setName("");
  }

  // READ
  useEffect(() => {
    try {
      const dbRef = query(ref(REALTIME_DATABASE, RD_PROJECT_NAME));

      setLoading(true);

      onValue(dbRef, (snapshot) => {
        const arr: ItemProps[] = [];
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          arr.push({ ...childData, id: childKey });
        });

        setItems(arr);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section className="mt-4">
      <h1>Realtime database</h1>

      <div className="section">
        <h2 className="section-label">Create</h2>

        <form className="mt-5 flex flex-col" onSubmit={craateItem}>
          <input
            type="text"
            value={name}
            autoFocus
            spellCheck="false"
            onChange={(e) => setName(e.target.value)}
            className="outline-none text-lg bg-transparent placeholder:text-gray-600"
            placeholder="Enter text..."
          />

          <button
            type="submit"
            disabled={!name}
            className={`mt-4 w-fit px-3 py-1 text-white rounded-md bg-orange-600 disabled:bg-gray-400`}
          >
            Add to database
          </button>
        </form>
      </div>

      <div className="section">
        <h2 className="section-label">Read - Update - Delete</h2>

        {loading ? (
          <Loader />
        ) : (
          <>
            {items.length > 0 ? (
              <div className="mt-5">
                {items.map((item) => (
                  <Item key={item.id} item={item} items={items} />
                ))}
              </div>
            ) : (
              <p className="wrapper mt-4 h-[50px] flex items-center px-4 text-gray-600">
                No items in Database
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

type Props = {
  item: ItemProps;
  items: ItemProps[];
};

function Item({ item, items }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [editableName, setEditableName] = useState("");

  // UPDATE
  function updateItem(item: ItemProps) {
    const updatedItem = { ...item, name: editableName };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updates: any = {};
    updates[RD_PROJECT_NAME + item.id] = updatedItem;

    return update(ref(REALTIME_DATABASE), updates);
  }

  // DELETE
  const deleteItemFromDatabase = (id: string) => {
    items.forEach(() => {
      remove(ref(REALTIME_DATABASE, RD_PROJECT_NAME + id))
        .then()
        .catch((error) => {
          console.error("Error removing item:", error);
        });
    });
  };

  return (
    <div key={item.id} className="mt-2 p-2 border bg-white rounded-md">
      <div className="flex items-center justify-between gap-2">
        <p>{item.name}</p>

        <div>
          <button
            onClick={() => {
              if (editableName) {
                updateItem(item);
                setEditMode(false);
                setEditableName("");
              } else {
                setEditMode(!editMode);
              }
            }}
            className={`${
              editMode
                ? editableName
                  ? "bg-green-400"
                  : "bg-gray-300"
                : "bg-yellow-400"
            }  text-sm px-3 py-1 rounded-l-md w-fit`}
          >
            {editMode ? (editableName ? "Save" : "Close") : "Edit"}
          </button>

          <button
            onClick={() => deleteItemFromDatabase(item.id)}
            className="bg-red-600 text-white text-sm px-3 py-1 rounded-r-md w-fit"
          >
            Delete
          </button>
        </div>
      </div>

      {editMode && (
        <input
          type="text"
          value={editableName}
          autoFocus
          onChange={(e) => setEditableName(e.target.value)}
          className="outline-none"
          placeholder="Edit text..."
        />
      )}
    </div>
  );
}
