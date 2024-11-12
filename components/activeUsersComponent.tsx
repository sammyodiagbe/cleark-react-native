import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { users } from "@/utils/helpers";

const ActiveUserComponent = () => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Active Users</Text>
        <Text style={styles.subtitle}>{users.length} online</Text>
      </View>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserItemComponent user={item} />}
        keyExtractor={(item) => item.username}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const UserItemComponent = ({ user }: { user: (typeof users)[0] }) => {
  return (
    <TouchableOpacity style={styles.userItem}>
      <Image source={{ uri: user.imageUrl }} style={styles.image} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.xp}>{user.xp} XP</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  userInfo: {
    flex: 1,
    gap: 5,
  },
  list: {
    gap: 5,
    paddingTop: 10,
    paddingBottom: 100,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  xp: {
    color: "#888",
  },
  subtitle: {
    color: "#888",
    fontSize: 14,
    fontWeight: "800",
  },
});

export default ActiveUserComponent;
