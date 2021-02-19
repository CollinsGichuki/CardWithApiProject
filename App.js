import React, { useEffect, useReducer } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Card } from "react-native-elements";

import { getPosts } from "./api/jsonTypicode";
import { actionCreators, initialState, reducer } from "./reducers/post";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchPosts() {
      dispatch(actionCreators.loading());

      try {
        const posts = await getPosts();

        dispatch(actionCreators.success(posts));
      } catch (e) {
        dispatch(actionCreators.failure());
      }
    }
    fetchPosts();
  }, []);

  const { posts, loading, error } = state;

  if (loading) {
    return (
      <View styles={styles.center}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  if (error) {
    return (
      <View styles={styles.center}>
        <Text>Failed to load Posts</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      keyExtractor={(post) => post.id}
      data={posts}
      renderItem={({ item: { id, title, body }, index }) => (
        <Card key={id}>
          <Text>
            {index}.{title}
          </Text>
          <Text>{body}</Text>
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1ACDA5",
  },
  post: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingVertical: 20,
    paddingRight: 20,
    marginLeft: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  body: {
    marginTop: 10,
    fontSize: 14,
    color: "#F8F8F8",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
