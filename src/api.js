import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    setDoc
} from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env
        .VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID
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

export async function addCostumes() {
    const costumesData = [
        {
            id: 1,
            name: "The Hulk",
            imageUrl:
                "https://live.staticflickr.com/2940/14582300179_72f45db564_b.jpg",
            description:
                "Step into the Hulk's colossal shoes with this costume! Featuring vibrant green skin and 'accidentally torn' purple pants, it's the epitome of smashing style. The muscle suit adds that 'extra oomph' for a physique even Tony Stark would envy. Accessorize with Hulk fists for maximum impact, and watch as even Thanos takes notes!",
            price: 49.99,
            category: "superhero",
            gender: "male"
        },
        {
            id: 2,
            name: "Superman",
            imageUrl:
                "https://live.staticflickr.com/3692/9618149614_0a624cf479_c.jpg",
            description:
                "Transform into the Man of Steel with this iconic Superman costume! Featuring the classic blue bodysuit with the unmistakable 'S' shield emblem, a flowing red cape, and form-fitting red boots, you'll radiate heroic confidence. With this costume, you're not just dressed as Superman – you are Superman, ready to leap tall buildings in a single bound and save the day!",
            price: 39.99,
            category: "superhero",
            gender: "male",
            hostId: "123"
        },
        {
            id: 3,
            name: "Spiderman",
            imageUrl:
                "https://live.staticflickr.com/3827/9321830033_28ab4ab322_c.jpg",
            description:
                "Swing into action as the friendly neighborhood Spider-Man with this amazing costume! Featuring the iconic red and blue spandex suit, complete with web patterns and a sleek spider emblem, you'll be ready to climb walls and shoot webs in no time. With this costume, you'll embody the agility, wit, and superhero spirit that defines Spider-Man!",
            price: 34.99,
            category: "superhero",
            gender: "male"
        },
        {
            id: 4,
            name: "Batman",
            imageUrl:
                "https://live.staticflickr.com/5465/9613612189_747146e0fd_c.jpg",
            description:
                "Embrace the darkness and become the legendary Caped Crusader with this Batman costume! Featuring a sleek black bodysuit, a stylized bat emblem, a flowing cape, and a utility belt packed with all the high-tech gadgets, you'll strike fear into the hearts of Gotham's villains. With this costume, you're not just dressed as Batman – you are the night, ready to defend justice!",
            price: 44.99,
            category: "superhero",
            gender: "male"
        },
        {
            id: 5,
            name: "Wonder Woman",
            imageUrl:
                "https://live.staticflickr.com/3095/2622032057_fe2b1bf2f0_c.jpg",
            description:
                "Channel the strength and grace of an Amazonian warrior with this Wonder Woman costume! Featuring a regal red and blue bodice adorned with the iconic gold eagle emblem, a flowing golden tiara, bulletproof bracelets, and a billowing red cape, you'll embody the power of Themyscira. With this costume, you'll stand as a beacon of truth and justice, ready to defend the world!",
            price: 49.99,
            category: "superhero",
            gender: "female",
            hostId: "123"
        },
        {
            id: 6,
            name: "Captain Marvel",
            imageUrl:
                "https://upload.wikimedia.org/wikipedia/commons/b/b9/SDCC_2018_-_Captain_Marvel_cosplay_%2828726135327%29.jpg",
            description:
                "Unleash the cosmic power of Captain Marvel with this heroic costume! Featuring the iconic red, blue, and gold suit with the star emblem, you'll embody superhuman strength, flight, and energy projection. With this costume, you're not just dressed as Captain Marvel – you are a force to be reckoned with, ready to defend the universe!",
            price: 42.99,
            category: "superhero",
            gender: "female"
        },
        {
            id: 7,
            name: "Viking",
            imageUrl:
                "https://live.staticflickr.com/5461/7144676415_713899f74e_c.jpg",
            description:
                "Channel the fearless spirit of the Norsemen with this Viking warrior costume! Featuring a rugged tunic, fur-lined cape, horned helmet, and a battle axe prop, you'll embody the strength and bravery of these ancient seafarers. With this costume, you'll command respect on any raid or conquest.",
            price: 42.99,
            category: "historical",
            gender: "male",
            hostId: "123"
        },
        {
            id: 8,
            name: "Ancient Egyptian Pharaoh",
            imageUrl:
                "https://www.publicdomainpictures.net/pictures/430000/velka/cleopatra-egypt-cosplay-image-1637074693QXi.jpg",
            description:
                "Step into the grandeur of ancient Egypt with this Pharaoh costume! Featuring a regal pharaonic robe, a golden headdress, and ornate accessories, you'll exude the power and majesty of the pharaohs. With this costume, you'll inspire awe and admiration as you rule over the Nile.",
            price: 48.99,
            category: "historical",
            gender: "female"
        },
        {
            id: 9,
            name: "Medieval Knight",
            imageUrl:
                "https://images.rawpixel.com/image_800/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL2Zya25pZ2h0X21pZGRsZV9hZ2VzX3RvdXJuYW1lbnRfMC1pbWFnZS1reWJkZTBxdC5qcGc.jpg",
            description:
                "Don the armor of a valiant knight with this medieval costume! Featuring a shining suit of armor, a crest-adorned shield, and a noble sword prop, you'll embody the chivalry and honor of the Middle Ages. With this costume, you'll be ready to joust, defend the realm, and win the hearts of fair maidens.",
            price: 54.99,
            category: "historical",
            gender: "male"
        },
        {
            id: 10,
            name: "Victorian Era Lady",
            imageUrl:
                "https://www.publicdomainpictures.net/pictures/400000/velka/victorian-lady-with-a-cane-1621599901si5.jpg",
            description:
                "Step back in time to the refined days of the Victorian era with this elegant costume! Featuring a flowing bustle gown, a wide-brimmed hat, and delicate accessories, you'll exude the grace and sophistication of the period. With this costume, you'll be ready for a genteel tea party or an evening at a grand ball.",
            price: 42.99,
            category: "historical",
            gender: "female"
        },
        {
            id: 11,
            name: "Wild West Outlaw",
            imageUrl:
                "https://live.staticflickr.com/8306/7829121070_69eab3f45d_c.jpg",
            description:
                "Embrace the rugged frontier spirit with this Wild West outlaw costume! Featuring a weathered duster coat, cowboy hat, and a six-shooter prop, you'll embody the daring and grit of the American frontier. With this costume, you'll be ready for high-stakes adventure and showdowns at high noon.",
            price: 45.99,
            category: "historical",
            gender: "unisex"
        },
        {
            id: 12,
            name: "Greek Spartan Warrior",
            imageUrl:
                "https://live.staticflickr.com/1418/1296971212_ce1d2f3e31_c.jpg",
            description:
                "Become a formidable warrior of ancient Greece with this Spartan costume! Featuring a bronze-hued cuirass, a red cape, a Corinthian helmet, and a spear prop, you'll embody the discipline and bravery of the Spartan phalanx. With this costume, you'll march into battle with unwavering resolve.",
            price: 49.99,
            category: "historical",
            gender: "male",
            hostId: "123"
        },
        {
            id: 13,
            name: "Vampire",
            imageUrl:
                "https://live.staticflickr.com/1/2689112_fd5539afbc_c.jpg",
            description:
                "Embrace the eternal allure of the Vampire with this classic costume! Cloaked in elegant, dark attire, with a crimson-lined cape and sharp fangs, you'll embody the immortal charm and mystique of the night. With this costume, you'll haunt both the shadows and the hearts of mortals.",
            price: 49.99,
            category: "fantasy",
            gender: "unisex"
        },
        {
            id: 14,
            name: "Werewolf",
            imageUrl:
                "https://upload.wikimedia.org/wikipedia/commons/d/d5/Bear_from_Axams.jpg",
            description:
                "Embrace the moonlit transformation as a fearsome Werewolf with this creature costume! Featuring realistic fur, clawed hands, and ferocious teeth, you'll embody the power and mystery of this legendary shape-shifter. With this costume, you'll strike fear into the hearts of all who cross your path.",
            price: 58.99,
            category: "fantasy",
            gender: "unisex"
        },
        {
            id: 15,
            name: "Wizard",
            imageUrl:
                "https://c2.peakpx.com/wallpaper/990/367/794/harry-potter-wizard-albus-dumbledore-wallpaper-preview.jpg",
            description:
                "Command the arcane arts as a Wizard with this mystical costume! Cloaked in robes adorned with celestial patterns, wielding a staff of power, and with an aura of ancient wisdom, you'll embody the mastery of mystical forces. With this costume, you'll shape the destiny of realms with your arcane prowess.",
            price: 55.99,
            category: "fantasy",
            gender: "unisex"
        },
        {
            id: 16,
            name: "Elven Archer",
            imageUrl:
                "https://live.staticflickr.com/4512/37568415012_01614420aa_c.jpg",
            description:
                "Embrace the grace and precision of the Elven Archer with this fantasy costume! Featuring an intricately detailed tunic, a quiver of enchanted arrows, and a bow, you'll embody the elegance and deadly accuracy of the elven warriors. With this costume, you'll move through the forest like a whispering breeze.",
            price: 55.99,
            category: "fantasy",
            gender: "female"
        },
        {
            id: 17,
            name: "Dwarven Warrior",
            imageUrl:
                "https://www.publicdomainpictures.net/pictures/70000/velka/fantastyval-1387120607ypX.jpg",
            description:
                "Forge your own path through the mountains as a dwarven warrior with this fantasy costume! Featuring a rugged suit of dwarven-forged armor, a battle-worn axe, and a sturdy shield, you'll embody the strength and resilience of the dwarven clans. With this costume, you'll stand tall in the face of any challenge.",
            price: 52.99,
            category: "fantasy",
            gender: "male"
        },
        {
            id: 18,
            name: "Hobbit",
            imageUrl:
                "https://live.staticflickr.com/5694/22784905511_a393802528_c.jpg",
            description:
                "Embark on a grand adventure through middle-earth as a hobbit adventurer! Don the simple, cozy attire of a hobbit, complete with a cloak, a walking stick, and a trusty satchel for your journey. You'll embody the courage and curiosity of a hobbit ready to explore the shire and beyond.",
            price: 45.99,
            category: "fantasy",
            gender: "unisex"
        },
        {
            id: 19,
            name: "Fairy",
            imageUrl:
                "https://images.pexels.com/photos/1545584/pexels-photo-1545584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            description:
                "Bring enchantment to life as a whimsical Fairy with this magical creature costume! Featuring gossamer wings, a sparkling gown, and a wand adorned with fairy dust, you'll embody the ethereal magic of woodland fairies. With this costume, you'll spread joy and enchantment wherever you go.",
            price: 55.99,
            category: "creature",
            gender: "female",
            hostId: "123"
        },
        {
            id: 20,
            name: "Minotaur",
            imageUrl:
                "https://live.staticflickr.com/2275/1914308974_1bac56df6c_c.jpg",
            description:
                "Stalk through the labyrinth as the powerful Minotaur with this mythical creature costume! Featuring a bull's head, a formidable axe, and a maze-inspired design, you'll embody the strength and ferocity of this legendary beast. With this costume, you'll command respect and awe in both myth and reality.",
            price: 70.99,
            category: "creature",
            gender: "unisex"
        },
        {
            id: 21,
            name: "Siren",
            imageUrl:
                "https://images.pexels.com/photos/15674512/pexels-photo-15674512/free-photo-of-woman-in-mermaid-costume-underwater.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            description:
                "Mesmerize sailors with the haunting beauty of a Siren in this captivating creature costume! Featuring flowing sea-inspired attire, alluring accessories, and an enchanting song, you'll embody the allure and danger of these mythical temptresses. With this costume, you'll hold sway over the hearts of all who hear you.",
            price: 65.99,
            category: "creature",
            gender: "female",
            hostId: "123"
        },
        {
            id: 22,
            name: "Satyr",
            imageUrl:
                "https://live.staticflickr.com/4142/4895186710_41702ec1cb_c.jpg",
            description:
                "Dance through the woods with the spirit of a Satyr with this mythical creature costume! Featuring hooves, a forest-green tunic, and a wreath of leaves, you'll embody the playful and mischievous nature of this woodland creature. With this costume, you'll evoke the spirit of ancient Greek revelry.",
            price: 64.99,
            category: "creature",
            gender: "male"
        },
        {
            id: 23,
            name: "Gorgon",
            imageUrl:
                "https://images.pexels.com/photos/6844526/pexels-photo-6844526.jpeg",
            description:
                "Strike fear into the hearts of mortals as a fearsome Gorgon with this mythical creature costume! Featuring snaky hair, a stone-cold gaze, and serpentine accessories, you'll embody the power and dread of this legendary monster. With this costume, you'll turn heads and leave a lasting impression.",
            price: 68.99,
            category: "creature",
            gender: "female",
            hostId: "123"
        },
        {
            id: 24,
            name: "Centaur",
            imageUrl:
                "https://upload.wikimedia.org/wikipedia/commons/0/02/Centaur_at_the_TRF_%288199083074%29.jpg",
            description:
                "Gallop into the realm of legends as a half-human, half-horse Centaur with this mythical creature costume! Featuring equine grace combined with human strength, you'll embody the duality of nature and civilization. With this costume, you'll stride confidently through the fields and forests.",
            price: 74.99,
            category: "creature",
            gender: "unisex"
        },
        {
            id: 25,
            name: "Marilyn Monroe",
            imageUrl:
                "https://upload.wikimedia.org/wikipedia/commons/d/d8/Tracey_Bell%2C_Marilyn_Monroe_Impersonator_%2816365064960%29.jpg",
            description:
                "Step into the glamorous shoes of the iconic Marilyn Monroe with this classic celebrity costume! Featuring a flowing white dress, platinum blonde curls, and red lipstick, you'll embody the timeless beauty and elegance of Hollywood's golden era. With this costume, you'll capture the hearts of all who see you.",
            price: 49.99,
            category: "celebrity",
            gender: "female"
        },
        {
            id: 26,
            name: "Elvis Presley",
            imageUrl:
                "https://cdn4.picryl.com/photo/2017/01/01/norman-webb-known-as-boardwalk-elvis-poses-at-the-night-of-100-elvises-at-the-a98ddb-1024.jpg",
            description:
                "Rock the stage as the King of Rock 'n' Roll, Elvis Presley, with this legendary celebrity costume! Featuring a rhinestone-studded jumpsuit, slicked-back hair, and signature sunglasses, you'll embody the charisma and musical prowess of the one and only Elvis. With this costume, you'll have the crowd all shook up!",
            price: 54.99,
            category: "celebrity",
            gender: "male"
        },
        {
            id: 27,
            name: "Charlie Chaplin",
            imageUrl:
                "https://live.staticflickr.com/5448/9326047327_0e94ac63f9_c.jpg",
            description:
                "Bring the silent film era to life as the iconic Charlie Chaplin with this legendary celebrity costume! Featuring a bowler hat, mustache, and classic suit, you'll embody the timeless humor and slapstick charm of this cinematic legend. With this costume, you'll be a true star of the silver screen.",
            price: 47.99,
            category: "celebrity",
            gender: "male"
        },
        {
            id: 28,
            name: "Albert Einstein",
            imageUrl:
                "https://live.staticflickr.com/3265/2314199268_ee44b08d74_c.jpg",
            description:
                "Step into the shoes of the legendary physicist Albert Einstein with this iconic celebrity costume! Featuring a wild white wig, a mustache, and a lab coat, you'll embody the genius and intellect of one of the greatest scientific minds in history. With this costume, you'll inspire curiosity and awe.",
            price: 56.99,
            category: "celebrity",
            gender: "male",
            hostId: "123"
        },
        {
            id: 29,
            name: "Michael Jackson",
            imageUrl:
                "https://live.staticflickr.com/5607/15681036831_64f909c458_h.jpg",
            description:
                "Moonwalk into the spotlight as the King of Pop, Michael Jackson, with this legendary celebrity costume! Featuring a red leather jacket, fedora, and sequined glove, you'll embody the electrifying talent and iconic style of the musical legend. With this costume, you'll thrill any audience with your moves!",
            price: 58.99,
            category: "celebrity",
            gender: "male"
        },
        {
            id: 30,
            name: "Frida Kahlo",
            imageUrl:
                "https://upload.wikimedia.org/wikipedia/commons/6/6b/Homok%C3%B3ra_-_Danis_L%C3%ADdia_mint_Frida_Kahlo.jpg",
            description:
                "Pay homage to the iconic Mexican artist Frida Kahlo with this legendary celebrity costume! Featuring colorful traditional attire, a flower crown, and bold accessories, you'll embody Kahlo's unique style and artistic spirit. With this costume, you'll celebrate the legacy of a groundbreaking artist and feminist icon.",
            price: 49.99,
            category: "celebrity",
            gender: "female"
        }
    ]

    costumesData.forEach(async (costume) => {
        const docRef = doc(costumesCollectionRef, `${costume.id}`)
        await setDoc(docRef, costume)
    })
}

addCostumes()
