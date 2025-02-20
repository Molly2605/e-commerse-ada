import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const fetchOrders = async () => {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userEmail", "==", currentUser.email));
        const querySnapshot = await getDocs(q);
        const userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(userOrders);
      };

      fetchOrders();
    }
  }, [currentUser]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Perfil de {currentUser?.email}</h2>
      <h3 className="text-xl font-semibold mt-4">Historial de Compras</h3>
      {orders.length === 0 ? (
        <p>No tienes compras registradas.</p>
      ) : (
        <ul className="mt-4">
          {orders.map(order => (
            <li key={order.id} className="border p-4 rounded-lg mb-2">
              <p><strong>Fecha:</strong> {new Date(order.date).toLocaleString()}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <p><strong>Productos:</strong></p>
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>{item.name} - {item.quantity} unidades</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfilePage;