import { SafeAreaWrapper } from "@/HOC";
import { Text } from "@/theme/theme";
import { Link } from "expo-router";
import { useState } from "react";
import Modal from "react-native-modal";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const UploadPost = () => {
  const [audienceModal, setAudienceModal] = useState(false);
  const [replyModal, setReplyModal] = useState(false);

  const toggleAudienceModal = () => setAudienceModal(!audienceModal);
  const toggleReplyModal = () => setReplyModal(!replyModal);

  return (
    <SafeAreaWrapper>
      {/* Header */}
      <View style={{ marginVertical: 16 }}>
        <Link
          href="/(auth)/login"
          style={{ color: "#B085EF", fontSize: 18, fontWeight: "600" }}
        >
          X <Text className="text-white">kksdw</Text>
        </Link>
      </View>

      {/* Reply Modal */}
      <Modal
        isVisible={replyModal}
        onBackdropPress={toggleReplyModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
      >
        <View style={styles.replyContainer}>
            <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 700, }}>Who can reply?</Text>
            <Text>People mentioned can always reply</Text>
            <View style={{gap: 5, marginTop: 5}}>
                <TouchableOpacity
                    onPress={toggleReplyModal}
                    style={{
                    padding: 12,
                    borderRadius: 8,
                    }}
                >
                    <Text style={{ fontWeight: "600" }}>Everyone</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={toggleReplyModal}
                    style={{
                    padding: 12,
                    borderRadius: 8,
                    }}
                >
                    <Text style={{ fontWeight: "600" }}>Nobody</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={toggleReplyModal}
                    style={{
                    padding: 12,
                    borderRadius: 8,
                    }}
                >
                    <Text style={{ fontWeight: "600" }}>only people you mentioned</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={toggleAudienceModal}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginBottom: 16,
          }}
        >
          <Text>Everyone</Text>
        </TouchableOpacity>

        <TextInput
          numberOfLines={6}
          multiline={true}
          textAlignVertical="top"
          style={{
            borderColor: "#ddd",
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
          }}
          placeholder="Write your post here"
        />
      </ScrollView>

      {/* Bottom bar */}
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>Everyone can reply</Text>
        <TouchableOpacity
        //   onPress={toggleReplyModal}
          style={{
            backgroundColor: "#E9D7FE",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
          }}
        >
          <Text style={{ fontWeight: "700" }}>Upload</Text>
        </TouchableOpacity>
      </View>

      {/* Audience Modal */}
      <Modal
        isVisible={audienceModal}
        onBackdropPress={toggleAudienceModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.bottomModal}
      >
        <View style={styles.bottomSheet}>
          <Text style={styles.bottomSheetTitle}>Choose Audience</Text>

          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "grey",
            }}
          >
            <Text>Everyone</Text>
          </View>

          <View style={{ paddingHorizontal: 20, gap: 10 }}>
            <Text style={{ fontWeight: "700", fontSize: 13 }}>
              My Communities
            </Text>

            <View style={{ gap: 15 }}>
              {["Branding", "Design"].map((community, i) => (
                <View
                  key={i}
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <View style={styles.profileImage} />
                  <View>
                    <Text>{community}</Text>
                    <Text style={{ color: "grey", fontSize: 12 }}>
                      500 members
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaWrapper>
  );
};

export default UploadPost;

const styles = StyleSheet.create({
  profileImage: {
    height: 40,
    width: 40,
    backgroundColor: "#F2750D",
    borderRadius: 8,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0
  },
  replyContainer: {
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    padding: 20,
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingBottom: 40,
    gap: 15,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});
