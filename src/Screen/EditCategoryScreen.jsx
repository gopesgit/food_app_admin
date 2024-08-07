import React, { useContext, useState } from "react";
import { StyleSheet, View, TextInput, Pressable, ScrollView, Image, ToastAndroid, KeyboardAvoidingView } from "react-native";
import { globalStyle } from "../common/style";
import { Button, Icon } from "@rneui/base";
import { pickImage, checkFormData, updateData } from "../common/someCommonFunction";
import { API_FOOD_CATEGORIE } from "../common/apiURL";
import { OperationContext } from "../context/operationContext";

export default function EditCategoryScreen({ route, navigation }) {
    const { allFunction } = useContext(OperationContext);
    const { category } = route.params;

    const [name, setName] = useState(category.name || "");
    const [description, setDescription] = useState(category.description || "");
    const [imageUrl, setImageUrl] = useState(category.image_url || null);
    const [loadingImage, setLoadingImage] = useState(true);

    const handleSubmit = async () => {
        let data = { name, description };
        const requiredFields = ['name', 'description'];

        if (!checkFormData(data, requiredFields) || !imageUrl) {
            ToastAndroid.showWithGravity(`Missing or empty field`, ToastAndroid.LONG, ToastAndroid.TOP);
            return;
        }

        let formdata = new FormData();
        if (imageUrl && imageUrl !== category.image_url) {
            formdata.append('image_url', {
                uri: imageUrl,
                type: 'image/jpeg', // Ensure this matches the image type
                name: 'category-image.jpg', // Provide a name for the image
            });
        }
        Object.keys(data).forEach(key => {
            formdata.append(key, data[key]);
        });
        formdata.append("active", 1);
        formdata.append('_method', 'put');

        try {
            await updateData(formdata, `${API_FOOD_CATEGORIE}/${category.id}`, "Category updated successfully");
            allFunction();
            ToastAndroid.showWithGravity("Category updated successfully", ToastAndroid.LONG, ToastAndroid.TOP);
            navigation.goBack();
        } catch (error) {
            console.error("Error updating category:", error);
            ToastAndroid.showWithGravity("Error updating category", ToastAndroid.LONG, ToastAndroid.TOP);
        }
    };

    return (
        <View style={[globalStyle.container, { backgroundColor: "#fff" }]}>
            <ScrollView>
                <KeyboardAvoidingView>
                    <View style={{ marginHorizontal: 20 }}>
                        <View style={globalStyle.inputBoxArea}>
                            <Pressable onPress={() => pickImage(setImageUrl)}>
                                {loadingImage && !imageUrl && (
                                    <Icon
                                        name="file-image-plus"
                                        size={200}
                                        color={"#ddd"}
                                        type="material-community"
                                    />
                                )}

                                {imageUrl ? (
                                    <Image
                                        source={{ uri: imageUrl }}
                                        style={styles.image}
                                        onLoad={() => setLoadingImage(false)}
                                        onError={() => setImageUrl(null)}
                                    />
                                ) : (
                                    <Image
                                        source={require('../../assets/default-catagory.png')}
                                        style={styles.image}
                                        onLoad={() => setLoadingImage(false)}
                                    />
                                )}
                            </Pressable>
                        </View>

                        <TextInput
                            style={globalStyle.inputBox}
                            placeholder='Food Category Name'
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                        <TextInput
                            style={globalStyle.inputBoxArea}
                            placeholder='Description'
                            value={description}
                            multiline
                            numberOfLines={4}
                            onChangeText={(text) => setDescription(text)}
                        />
                        <Button
                            title={"Update Category"}
                            radius={12}
                            buttonStyle={{ marginTop: 8 }}
                            onPress={handleSubmit}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
        borderRadius: 12,
    },
});
