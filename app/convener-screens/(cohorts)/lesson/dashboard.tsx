import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaWrapper } from "@/HOC";import { Back, Close, Options, Plus, PlusSmall } from '@/assets/icons';
import { useRouter } from "expo-router";
import { useState } from "react";
import { X } from "lucide-react-native";

export default function Dashboard() {
    const router = useRouter()
    const [isModalVisible, setModalVisible] = useState(true);
    const [courseType, setCourseType] = useState("self-paced")

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
  };
    const courseOptions = [
    {
      key: "self-paced",
      title: "Self-paced",
      description: "Learners can start immediately and learn at their own pace",
    },
    {
      key: "structured",
      title: "Structured",
      description: "Learning follows a structured, guided path with milestones",
    },
    {
      key: "scheduled",
      title: "Scheduled",
      description: "Courses run on a set schedule with live sessions",
    },
  ];
    const getButtonStyle = (isActive: any) => ({
    width: 270, // fallback for string percentage, but better to use number below
    marginTop: 20,
    borderWidth: 1,
    backgroundColor: isActive ? "#EDE9FE" : "white",
    padding: 12,
    borderRadius: 8,
    borderColor: isActive ? "#391D65" : "black",
  });

  // Recommended: use flex or number for width
  // const getButtonStyle = (isActive: any) => ({
  //   alignSelf: "center",
  //   width: "85%" as any, // or use width: 0.85 if parent uses flex
  //   marginTop: 20,
  //   borderWidth: 1,
  //   backgroundColor: isActive ? "#EDE9FE" : "white",
  //   padding: 12,
  //   borderRadius: 8,
  //   borderColor: isActive ? "#391D65" : "black",
  // });

  // Or, for strict type safety:
  // const getButtonStyle = (isActive: any) => ({
  //   alignSelf: "center",
  //   width: 0.85 * Dimensions.get("window").width, // import Dimensions from 'react-native'
  //   marginTop: 20,
  //   borderWidth: 1,
  //   backgroundColor: isActive ? "#EDE9FE" : "white",
  //   padding: 12,
  //   borderRadius: 8,
  //   borderColor: isActive ? "#391D65" : "black",
  // });
  return (
    <SafeAreaWrapper>
        <View style={{ backgroundColor: 'white', marginVertical: 16 }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => router.back()}>
                <Back />
                </TouchableOpacity>
                <Text
                style={{
                    color: '#391D65',
                    fontFamily: 'DMSansSemiBold',
                    marginLeft: 16,
                }}
                >
                Branding & Branding Design
                </Text>
                <TouchableOpacity
                style={{ marginLeft: 'auto' }}
                >
                <Plus />
                </TouchableOpacity>
            </View>
        </View>
        {/* Header */}
        <View style={styles.container}>
            
            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>Course Dashboard</Text>
                <TouchableOpacity
                onPress={toggleModal}>
                    <MaterialIcons name="edit" size={22} color="#6B7280" />
                </TouchableOpacity>
            </View>

            {/* Status & Type */}
            <View style={styles.statusRow}>
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>Status: Draft</Text>
                </View>
                <MaterialIcons name="menu-book" size={16} color="#6B7280" />
                <Text style={styles.courseType}>
                    Course type: <Text style={styles.courseTypeUnderline}>{courseType}</Text>
                </Text>
            </View>

            {/* Waitlist */}
            <View style={styles.card}>
                <Text style={styles.cardLabel}>Waitlist</Text>
                <Text style={styles.cardValue}>0</Text>
            </View>

            {/* Completion Rate */}
            <View style={styles.card}>
                <Text style={styles.cardLabel}>Average completion rate</Text>
                <Text style={styles.cardValue}>0%</Text>
            </View>

            {/* Draft Notice */}
            <View style={styles.draftNotice}>
                <Text style={styles.draftTitle}>
                    This course is in draft mode.
                </Text>
                <Text style={styles.draftDescription}>
                    Engagement data will show up here once you publish your course.
                </Text>
            </View>
        </View>
        {isModalVisible && (
            <View
            style={styles.backdrop}>
                <View style={{
                    backgroundColor: "#fff",
                    padding: 20,
                    borderRadius: 12,
                    }}>
                        <TouchableOpacity onPress={toggleModal} style={{alignSelf: "flex-end", borderWidth: 2, borderRadius: 50, padding: 2, borderColor: "black"}}>
                            <X size={16} color="black" />
                        </TouchableOpacity>
                        <Text style={{fontSize: 20, fontWeight: 700, textAlign: "center"}}>Choose course type</Text>
                      
      {courseOptions.map((option) => {
        const isActive = courseType === option.title;
        return (
          <TouchableOpacity
            key={option.key}
            onPress={() => setCourseType(option.title)}
            style={getButtonStyle(isActive)}
          >
            <Text style={{ fontSize: 18 }}>{option.title}</Text>
            <Text style={{ color: "#6B7280", marginTop: 5 }}>
              {option.description}
            </Text>
          </TouchableOpacity>
        );
      })}
                </View>
            </View>)
        }
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    },
    container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F1F1F",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  statusBadge: {
    backgroundColor: "#F3E8FF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#7C3AED",
  },
  courseType: {
    marginLeft: 8,
    fontSize: 12,
    color: "#6B7280",
  },
  courseTypeUnderline: {
    textDecorationLine: "underline",
    color: "#1F1F1F",
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1F1F1F",
  },
  draftNotice: {
    marginTop: 32,
    alignItems: "center",
  },
  draftTitle: {
    fontSize: 16,
    color: "#1F1F1F",
    fontWeight: "500", 
    marginBottom: 8,
    textAlign: "center",
  },
  draftDescription: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});