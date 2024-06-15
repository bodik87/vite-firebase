import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  onSnapshot,
  query,
  deleteDoc,
} from "firebase/firestore";
import { FIRESTORE_COLLECTION, FIRESTORE_DATABASE } from "../../firebase";
import Loader from "../components/loader";

type ItemProps = {
  id: string;
  name: string;
};

export default function FirestorePage() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ItemProps[]>([]);

  const [name, setName] = useState("");

  const newItem = { name };

  // CREATE
  const craateItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = await addDoc(
        collection(FIRESTORE_DATABASE, FIRESTORE_COLLECTION),
        newItem
      );
      console.log("Document written with ID: ", docRef.id);
      setName("");
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setLoading(false);
    }
  };

  // READ
  useEffect(() => {
    const q = query(collection(FIRESTORE_DATABASE, FIRESTORE_COLLECTION));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const itemsArr: any = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      return () => unsubscribe();
    });
  }, []);

  return (
    <section className="mt-4">
      <h1>Firestore</h1>

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
            Add to Firestore database
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

function Item({ item }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [editableName, setEditableName] = useState("");

  // UPDATE
  const updateItem = async (id: string) => {
    const docRef = doc(FIRESTORE_DATABASE, FIRESTORE_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { item }: any = docSnap.data();

    const updatedItem = { ...item, name: editableName };

    await updateDoc(docRef, updatedItem);
  };

  // DELETE
  const deleteItem = async (id: string) => {
    await deleteDoc(doc(FIRESTORE_DATABASE, FIRESTORE_COLLECTION, id));
  };

  return (
    <div key={item.id} className="mt-2 p-2 border bg-white rounded-md">
      <div className="flex items-center justify-between gap-2">
        <p>{item.name}</p>

        <div>
          <button
            onClick={() => {
              if (editableName) {
                updateItem(item.id);
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
            onClick={() => deleteItem(item.id)}
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
