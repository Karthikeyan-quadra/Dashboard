import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import { getSP } from "./Pnpconfig";


export async function Adding(description: string, title: string, tasks:string) {
  const sp = getSP();
  const Listadd: any = await sp.web.lists.getByTitle("Dashboarddata").items.add({
    Title: title,
    Description: description,
    Tasks:tasks
  });
  console.log(Listadd);
}

export async function Fetch() {
  const sp = getSP();
  const listAddResult: any = await sp.web.lists.getByTitle("Dashboarddata").items.getAll();
  console.log(listAddResult);
  return listAddResult;

}
