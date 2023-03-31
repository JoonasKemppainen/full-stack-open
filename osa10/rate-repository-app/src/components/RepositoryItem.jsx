import { View, StyleSheet, Image } from "react-native"
import Text from "./Text";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        paddingBottom: 10
    },
    mainContainer: {
        flexDirection: "row",
        padding: 10,
    },
    imageContainer: {
        paddingRight: 10,
    },
    infoContainer: {
        flexDirection: "column",
    },
    infoItem: {
        paddingBottom: 5,
        alignSelf: "flex-start",
    },
    statContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    statItemContainer: {
        flexDirection: "column",
        alignItems: "center",
    }
});

const RespositoryItem = ({item}) => {
    return (
        <>
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{
                        uri: `${item.ownerAvatarUrl}`,
                        }}
                        style={{width: 50, height: 50, borderRadius: 5}}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text color="textsecondary">{item.description}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text color="white" style={{backgroundColor: "#0366d6", padding: 5, borderRadius: 5, marginTop: 5}}>{item.language}</Text>
                    </View> 
                </View>
            </View>
            <View style={styles.statContainer}>
                <View style={styles.statItemContainer}>
                    {item.stargazersCount < 1000 
                    ? <Text fontWeight="bold">{item.stargazersCount}</Text>
                    : <Text fontWeight="bold">{(item.stargazersCount / 1000).toFixed(1)}k</Text>
                    }
                    <Text>Stars</Text>
                </View>
                <View style={styles.statItemContainer}>
                    {item.forksCount < 1000 
                    ? <Text fontWeight="bold">{item.forksCount}</Text>
                    : <Text fontWeight="bold">{(item.forksCount / 1000).toFixed(1)}k</Text>
                    }
                    <Text>Forks</Text>
                </View>
                <View style={styles.statItemContainer}>
                    {item.reviewCount < 1000 
                    ? <Text fontWeight="bold">{item.reviewCount}</Text>
                    : <Text fontWeight="bold">{(item.reviewCount / 1000).toFixed(1)}k</Text>
                    }
                    <Text>Reviews</Text>
                </View>
                <View style={styles.statItemContainer}>
                    {item.ratingAverage < 1000 
                    ? <Text fontWeight="bold">{item.ratingAverage}</Text>
                    : <Text fontWeight="bold">{(item.ratingAverage / 1000).toFixed(1)}k</Text>
                    }
                    <Text>Rating</Text>
                </View>
            </View>
        </View>    
        </>
    )
}

export default RespositoryItem;