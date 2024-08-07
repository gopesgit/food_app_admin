import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/base';
import { Card } from 'react-native-elements';
import moment from 'moment';
import { API_ORDER } from '../common/apiURL';
import { insertData } from '../common/someCommonFunction';

const OrderItemRoow = ({ item = {} }) => {
  const handleCancel = async () => {
    const formdata = new FormData();
    formdata.append('_method', 'put');
    formdata.append('status_restaurant', 'cancel');
    await insertData(formdata, `${API_ORDER}${item.id}`);
    console.log('Cancel button pressed', item.id);
  };

  const handleAccept = async () => {
    const formdata = new FormData();
    formdata.append('_method', 'put');
    formdata.append('status_restaurant', 'accept');
    await insertData(formdata, `${API_ORDER}${item.id}`);
    console.log('Accept button pressed', item.id);
  };

  const handleDelivery = async () => {
    const formdata = new FormData();
    formdata.append('_method', 'put');
    formdata.append('status_restaurant', 'delivery');
    await insertData(formdata, `${API_ORDER}${item.id}`);
    console.log('Delivery button pressed', item.id);
  };

  // Define messages for statuses
  const statusRestaurantMessages = {
    pending: 'Waiting for accept at Restaurant',
    accept: 'Preparing your order',
    delivery: 'Out for Delivery',
    cancel:
      'Sorry to inform you that Restaurant has rejected your order. If any amount has been deducted, it will be refunded within 3-7 working days',
  };

  const statusDeliveryMessages = {
    pending: 'Finding a Delivery partner for you',
    accept: 'Waiting to collect your order from Restaurant',
    delivery: 'Your order has been successfully Delivered',
    cancel:
      'Sorry to inform you that we are unable to find any Delivery partner for your order. If any amount has been deducted, it will be refunded within 3-7 working days',
  };

  return (
    <View>
      <Card>
        <Card.Title>
          Order Number: {item.id} {'\n'}
          {moment(item.updated_at).format('MMMM Do YYYY, h:mm:ss a')}
        </Card.Title>

        {(item.order_details || []).map((orderItem) => (
          <View key={orderItem.id} style={styles.orderDetail}>
            <Text>Food Name: {orderItem.name}</Text>
            <Text>Quantity: {orderItem.quantity}</Text>
            <Text>Selling Price: {orderItem.price}</Text>
          </View>
        ))}
        <View style={styles.totalAmount}>
          <Text>Total Amount: {item.amount}</Text>
        </View>

        {item.status_restaurant !== 'pending' &&
          item.status_restaurant !== 'cancel' && (
            <View>
              <Text style={styles.statusContainer}>
                <Text style={styles.statusHeading}>Order Status: </Text>
                {statusRestaurantMessages[item.status_restaurant]}
              </Text>
              {item.status_restaurant !== 'delivery' && (
                <View>
                  <Text style={styles.statusContainer}>
                    <Text style={styles.statusHeading}>
                      Delivery Partner Status:{' '}
                    </Text>
                    {statusDeliveryMessages[item.status_delivery]}
                  </Text>
                  {item.status_delivery !== 'pending' &&
                    item.status_delivery !== 'cancel' && (
                      <Text style={styles.statusContainer}>
                        <Text style={styles.statusHeading}>
                          Delivery Partner Name:{' '}
                        </Text>
                        {item.delivery_user?.name || 'N/A'}
                      </Text>
                    )}
                </View>
              )}
            </View>
          )}

        {item.status_restaurant === 'pending' && (
          <Text style={styles.statusContainer}>
            <Text style={styles.statusHeading}>Order Status: </Text>
            {statusRestaurantMessages[item.status_restaurant]}
          </Text>
        )}

        {item.status_restaurant === 'delivery' && (
          <View>
            <Text style={styles.statusContainer}>
              <Text style={styles.statusHeading}>Delivery Partner Status: </Text>
              {statusDeliveryMessages[item.status_delivery]}
            </Text>
            {item.status_delivery !== 'pending' &&
              item.status_delivery !== 'cancel' && (
                <Text style={styles.statusContainer}>
                  <Text style={styles.statusHeading}>
                    Delivery Partner Name:{' '}
                  </Text>
                  {item.delivery_user?.name || 'N/A'}
                </Text>
              )}
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            size="sm"
            buttonStyle={{ backgroundColor: 'red', width: 120 }}
            onPress={handleCancel}
          />
          {item.status_restaurant !== 'accept' ? (
            <Button
              title="Accept"
              size="sm"
              buttonStyle={{ backgroundColor: 'green', width: 120 }}
              onPress={handleAccept}
            />
          ) : (
            <Button
              title="Delivery"
              size="sm"
              buttonStyle={{ backgroundColor: 'green', width: 120 }}
              onPress={handleDelivery}
            />
          )}
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  orderDetail: {
    borderBottomWidth: 1,
    paddingVertical: 4,
    borderTopWidth: 1,
    marginVertical: 1,
  },
  totalAmount: {
    borderBottomWidth: 1,
    paddingVertical: 4,
    borderTopWidth: 1,
    marginVertical: 1,
  },
  statusContainer: {
    paddingVertical: 4,
    marginVertical: 1,
  },
  statusHeading: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
});

export default OrderItemRoow;
