import { ActionPanel, Action, List } from "@raycast/api";
import axios from 'axios';
import { useEffect, useState } from 'react'; // Import useState and useEffect

export default function Command() {
  
  const GhTagsURL: string = "https://api.github.com/repos/cilium/cilium/tags"
  const GhURL: string = "https://github.com"

  const [items, setItems] = useState<{ key: number, title: string, link: string}[]>([]);


  useEffect(() => {
    axios.get(GhTagsURL)
      .then(response => {
        const fetchedItems: { key: number, title: string, link: string}[] = [];
        let keyCounter: number = 0;
        response.data.forEach((element: { name: string; }) => {
          fetchedItems.push({ key: keyCounter, title: element.name, link: GhURL + "/cilium/cilium/blob/" + element.name + "/install/kubernetes/cilium/values.yaml" });
          keyCounter++;
        });

        setItems(fetchedItems);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  return (
    <List>
      {items.map((item) => (
        <List.Item 
          key={item.key}
          icon="list-icon.png"
          title={item.title}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={item.link} />
              <Action.CopyToClipboard content={item.link} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );

}
