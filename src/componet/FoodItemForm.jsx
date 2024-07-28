import React from 'react';
import { StyleSheet, TextInput, View, Image, Text, Pressable, Switch } from 'react-native';
import { Icon,Button } from '@rneui/base';
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';

const FoodItemForm = ({
  image,
  setImage,
  name,
  setName,
  price,
  setPrice,
  description,
  setDescription,
  ingredients,
  setIngredients,
  package_items_count,
  setPackageItemsCount,
  weight,
  setWeight,
  unit,
  setUnit,
  featured,
  setFeatured,
  deliverable,
  setDeliverable,
  category_id,
  setCategoryId,
  foodcategorie,
  handleImagePick,
  handleCategoryChange,
  isLoading,
  handleSubmit
}) => (
  <View style={{ marginHorizontal: 12 }}>
    <View style={styles.inputBoxImage}>
      <Pressable onPress={handleImagePick}>
        {!image ? (
          <Icon
            name="file-image-plus"
            size={150}
            color={"#ddd"}
            type="material-community"
          />
        ) : (
          <Image source={{ uri: image }} style={styles.image} />
        )}
      </Pressable>
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
      value={price}
      onChangeText={setPrice}
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
      placeholder='Unit (e.g., gm, pcs, liter)'
      value={unit}
      onChangeText={setUnit}
      style={styles.input}
    />

    <TextInput
      placeholder='Featured'
      value={featured}
      onChangeText={setFeatured}
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
      <View>
        <Dropdown
          style={styles.dropdown}
          data={foodcategorie}
          labelField="name"
          valueField="id"
          placeholder="Select Category"
          onChange={handleCategoryChange}
        />
      </View>
    )}

    <Button title={isLoading ? "Submitting..." : "Submit"} onPress={handleSubmit} loading={isLoading} />
  </View>
);

const styles = StyleSheet.create({
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
  inputBoxImage: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default FoodItemForm;
