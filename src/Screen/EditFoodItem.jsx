import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, TextInput, View, Image, Text, Pressable, ToastAndroid, SafeAreaView, Switch } from 'react-native';
import { Button, Icon } from '@rneui/base';
import { checkFormData, insertData, pickImage, updateData } from '../common/someCommonFunction';
import { API_FOOD } from '../common/apiURL';
import { OperationContext } from '../context/operationContext';
import { globalStyle } from '../common/style'
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
const EditFoodItem = ({route}) => {
  const {item}=route.params
  const navigation=useNavigation();
  //console.log(item);
  const { foodcategorie,allFunction } = useContext(OperationContext);
  // console.log("RES=>",restaurant);
  // console.log("FoodCAT=>",foodcategorie);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(item.food_image_url || '');
  const [name, setName] = useState(item.name || '');
  const [price, setPrice] = useState(item.price?.toString() || ''); // Ensure price is a string
  const [discount_price, setDiscountPrice] = useState(item.discount_price?.toString() || '');
  const [description, setDescription] = useState(item.description || '');
  const [ingredients, setIngredients] = useState(item.ingredients || '');
  const [package_items_count, setPackageItemsCount] = useState(item.package_items_count?.toString() || '');
  const [weight, setWeight] = useState(item.weight?.toString() || '');
  const [unit, setUnit] = useState(item.unit || '');
  const [deliverable, setDeliverable] = useState(Boolean(item.deliverable));
  const [category_id, setFoodCategorie] = useState(item.category_id || '');
  const [active, setActive] = useState(item.active);
  const [restaurant_id] = useState(item.restaurant_id);
  const handleSubmit = async () => {
    const data = {
      name,
      price: parseFloat(price),
      description,
      ingredients:ingredients==='' ? 'Enter some ingredients of food' : ingredients,
      package_items_count:package_items_count===''?0:parseFloat(package_items_count),
      weight:weight===''?0: parseFloat(weight),
      unit:unit==''?'pcs':unit,
      deliverable: deliverable ? 1 : 0,
      active,
      restaurant_id,
      category_id,
      discount_price:discount_price===''?0:parseFloat(discount_price),
    };

    const requiredFields = ['name', 'price', 'description', 'restaurant_id', 'category_id'];
    if (!checkFormData(data, requiredFields) || !image) {
      ToastAndroid.showWithGravity(`Missing or empty field`, ToastAndroid.LONG, ToastAndroid.TOP);
      return;
    }

    let formdata = new FormData();
    formdata.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    Object.keys(data).forEach(key => {
      formdata.append(key, data[key]);
    });
    formdata.append('_method', 'put');
    //console.log("000",formdata);
    try {
      setLoading(true);
      await updateData(formdata, API_FOOD+"/"+item.id,"Food Item Update");
      setName('');
      setPrice('');
      setDescription('');
      setIngredients('');
      setPackageItemsCount('');
      setWeight('');
      setUnit('');
      setDeliverable(false);
      setFoodCategorie('');
      setDiscountPrice('');
      setImage(null);
      navigation.goBack()
      setLoading(false);
      //ToastAndroid.showWithGravity(`Data submitted`, ToastAndroid.LONG, ToastAndroid.TOP);
    } catch (error) {
      setLoading(false);
      ToastAndroid.showWithGravity(`Error submitting data`, ToastAndroid.LONG, ToastAndroid.TOP);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.form}>
          <View style={globalStyle.inputBoxImage}>
              <View style={{ position: 'relative' }}>
                <Pressable onPress={() => pickImage(setImage)}>
                  {!image &&
                    <Icon
                      name="file-image-plus"
                      size={150}
                      color={"#ddd"}
                      type="material-community"
                    />
                  }
                  {image && <Image source={{ uri: image }} style={styles.image} />}
                </Pressable>

              </View>
            </View>

            <TextInput
              placeholder='Enter name of Food'
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder='Price of Food'
              value={price}
              onChangeText={setPrice}
              style={styles.input}
              keyboardType='numeric'
            />
            <TextInput
              placeholder='Discount Price'
              value={discount_price}
              onChangeText={setDiscountPrice}
              style={styles.input}
              keyboardType='numeric'
            />
            <TextInput
              placeholder='Description of Food Item'
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />
            <TextInput
              placeholder='Ingredients of Food'
              value={ingredients}
              onChangeText={setIngredients}
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />
            <TextInput
              placeholder='Package Items Count'
              value={package_items_count}
              onChangeText={setPackageItemsCount}
              style={styles.input}
              keyboardType='numeric'
            />
            <TextInput
              placeholder='Weight'
              value={weight}
              onChangeText={setWeight}
              style={styles.input}
              keyboardType='numeric'
            />
            <TextInput
              placeholder='Unit(gm,pcs,litter)'
              value={unit}
              onChangeText={setUnit}
              style={styles.input}
            />
          
            <View style={styles.switchContainer}>
              <Text>Deliverable</Text>
              <Switch
                value={deliverable}
                onValueChange={setDeliverable}
              />            
            </View>

            {foodcategorie && (
               <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category_id}
                style={styles.picker}
                onValueChange={(itemValue) => setFoodCategorie(itemValue)}
              >
                <Picker.Item label="Select Category" value="" />
                {foodcategorie.map((category) => (
                  <Picker.Item key={category.id} label={category.name} value={category.id} />
                ))}
              </Picker>
              </View>
            )}


            {loading ? (
              <Button title="Submitting..." type="solid" loading size='lg' />
            ) : (
              <Button title="Edit Food" onPress={handleSubmit} />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 12,
  },
  form: {
    marginHorizontal: 12,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  textArea: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    height: 100,
    textAlignVertical: 'top',
  },
  dropdown: {
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 5,
    paddingLeft: 10,
    color: '#af9f85',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
export default EditFoodItem