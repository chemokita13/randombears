import { Data, Photo } from "@/types/types";
import axios from "axios";

async function getData(n: number = 80){
  function getRandomItem(array: any[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
  const possibleQuerys = [ "Cute Bear","Bears", "Bear","Bears in nature","Toy Bears"]
  const query = getRandomItem(possibleQuerys)
  const response = await axios.get("https://api.pexels.com/v1/search?query="+  query + "&per_page=" + n, {
    headers: {
      Authorization: process.env.pexelsAPI
    }
  })
  return response.data
}
export default async function Home() {
  const data:  Data= await getData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between min-w-screen bg-amber-700">
      <h1 className="text-9xl font-extrabold text-white">Bears</h1>
      <h2 className="bg-amber-900 rounded-lg font-bold text-xl p-5 m-1 text-amber-100">⚠️Warning: Bears are so cute and you can love them so much, but they cannot love you in the same way and it may cause several heart problems⚠️</h2>
      <h3 className="bg-amber-900 rounded-lg p-1 m-1 text-amber-200">I am researching photos with the word &quot;bear&quot; on the internet but I cannot be sure if it really is a bear :(</h3>
      <h4 className="bg-amber-800 rounded-lg p-5 border border-amber-400 text-xl m-1">&#128153;&#129505;</h4>
      <h5 className="bg-amber-800 rounded-lg p-5 border border-amber-400 text-xl m-1 text-white italic">TMTA</h5>
      {data.photos.length === 0 && <h1>There are no photos</h1>}
      {
        data.photos.map((photo: Photo, index) => {
            return (<img src={photo.src.medium} key={index} alt={photo.alt}/>)
        })
      }
    </main>
  );
}
