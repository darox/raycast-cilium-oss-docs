import { ActionPanel, Action, Icon, List } from "@raycast/api";
import ITEMS from "./data/links.json";




export default function Command() {
  return (
    <List>
      {ITEMS.map((item) => (
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
