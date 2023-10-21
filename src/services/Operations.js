import { db } from "../FireBase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, where, } from "firebase/firestore";

const User = collection(db, "Users")
const electronicsCollection = collection(db, "Eelectronics");
const fashionCollection = collection(db, "Fashion");
const furnicheerCollection = collection(db, "Furnicheer");
const groceryCollection = collection(db, "Grocery");
const OrdersCollection = collection(db, "Orders");
const ToyCollection = collection(db, "Toys");

class Bokdatasevice {
 
    AddUser = (newUser) => {
        return addDoc(User, newUser);//insert book
    }
    AddOrder = (newOrder) => {
        return addDoc(OrdersCollection, newOrder);// Place order 
    }
    UpdateUser = (id, UpdateUser) => {
        const bookdoc = doc(db, "Users", id);
        return updateDoc(bookdoc, UpdateUser);//update book
    }
    deletBook = (id) => {
        const bookdoc = doc(db, "Users", id);
        return deleteDoc(bookdoc);//delete book

    }
    gettAllUsers = () => {
        return getDocs(User);//get all
    }
    async gettAllToys() {
        try {
            const querySnapshot = await getDocs(ToyCollection);
            const toys = [];

            querySnapshot.forEach((doc) => {
                const toyData = doc.data();
                toys.push({ id: doc.id, ...toyData });
            });

            return toys;
        } catch (error) {
            console.error("Error getting all toys: ", error);
            throw error;
        }
    }

    getbook = (id) => {
        const bookdoc = doc(db, "Users", id);
        return getDoc(bookdoc);// get one data 
    }


    gettelectronics = () => {
        return getDocs(electronicsCollection);//get all
    }
    getGrocery = () => {
        return getDocs(groceryCollection);//get all
    }
    getfashion = () => {
        return getDocs(fashionCollection);//get all
    }
    getFurnicheer = () => {
        return getDocs(furnicheerCollection);//get all
    }

    findUserByCredentials = async (User_Name, Password) => {
        try {
            const querySnapshot = await getDocs(User);
            let foundUser = null;

            querySnapshot.forEach((doc) => {
                const userData = doc.data();

                if (userData.User_Name === User_Name && userData.Password === Password) {
                    foundUser = { id: doc.id, ...userData };
                }
            });

            return foundUser;
        } catch (error) {
            console.error("Error finding user by credentials: ", error);
            throw error;
        }
    }
    async getOrdersByUserId(userId) {
        try {
            const ordersCollection = collection(db, "Orders");
            const ordersQuery = query(ordersCollection, where("UserId", "==", userId));
            const querySnapshot = await getDocs(ordersQuery);
            const orders = [];

            querySnapshot.forEach((doc) => {
                orders.push({ id: doc.id, ...doc.data() });
            });

            return orders;
        } catch (error) {
            console.error("Error retrieving orders by UserId: ", error);
            throw error;
        }
    }

}
export default new Bokdatasevice();