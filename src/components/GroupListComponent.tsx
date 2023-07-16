import { SafeAreaView } from "react-native";
import { FlatList } from "native-base";
import { Group } from "../model/Group";
import { GroupItemComponent } from "./GroupItemComponent";
import React from "react";
import tw from "twrnc";

type GroupListProps = {
  groups: Group[]
}

export const GroupListComponent = ({ groups }: GroupListProps) => {
  const [selectedItem, setSelectedItem] = React.useState<Group | null>(null)

  return (<>
    <SafeAreaView>
      <FlatList
          data={ groups }
          renderItem={ ({ item }) =>
              <GroupItemComponent
                  group={ item }
                  onPress={ () => setSelectedItem(item) }
                  isSelected={ selectedItem?.id === item.id }
              /> }
          keyExtractor={ ({ id }) => id.toString() }
      />
    </SafeAreaView>
  </>);
}