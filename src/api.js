const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const costumesCollectionRef = collection(db, "costumes")

export async function getCostumes() {
    const snapshot = await getDocs(costumesCollectionRef)
    const costumes = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
    }))
    return costumes
}

export async function getCostume(id) {
    const docRef = doc(db, "costumes", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostCostumes() {
    const q = query(costumesCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const costumes = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
    }))
    return costumes
}

export async function loginUser(creds) {
    const res = await fetch("/api/login", {
        method: "post",
        body: JSON.stringify(creds)
    })
    const data = await res.json()
    console.log(res)

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}
