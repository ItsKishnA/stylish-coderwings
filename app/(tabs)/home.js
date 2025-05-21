import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import banner2 from "./../../assets/Images/banner2.png";
import cat1 from "./../../assets/Images/elipse2.png";
import cat2 from "./../../assets/Images/elipse3.png";
import cat3 from "./../../assets/Images/Ellipse4.png";
import offer1 from "./../../assets/Images/offer1.png";
import offer2 from "./../../assets/Images/offer2.png";
import productImage from "./../../assets/Images/productImage.png";
import productImage2 from "./../../assets/Images/productImage2.png";

const home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const CategoryBar = () => {
    const items = {
      category: [
        {
          src: cat1,
          title: "Beauty",
        },
        {
          src: cat2,
          title: "Fashion",
        },
        {
          src: cat3,
          title: "Kids",
        },
        {
          src: cat1,
          title: "Mens",
        },
        {
          src: cat2,
          title: "Womens",
        },
      ],
    };

    const Cat = ({ src, title }) => {
      return (
        <View style={{ flexDirection: "column" }}>
          <Image source={src} />
          <Text>{title}</Text>
        </View>
      );
    };

    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-around",
          marginBottom: 16,
        }}
      >
        {items.category.map((item, index) => (
          <Cat src={item.src} title={item.title} />
        ))}
      </TouchableOpacity>
    );
  };

  const Banner = ({ src }) => {
    return (
      <View style={styles.BannerContainer}>
        <Image height={189} source={src} />
      </View>
    );
  };

  const CurrentDeal = () => {
    return (
      <View style={styles.CurrentDealContainer}>
        <Text style={[styles.DealText, { fontSize: 16 }]}>Deal of the Day</Text>
        <Text style={[styles.DealText, { fontSize: 12 }]}>
          23h 55m remaining
        </Text>
      </View>
    );
  };

  const CurrentDeal2 = () => {
    return (
      <TouchableOpacity
        style={[
          styles.CurrentDealContainer,
          {
            backgroundColor: "transparent",
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Image source={offer2} />
      </TouchableOpacity>
    );
  };

  const HorizontalCatalogue = () => {
    const items = {
      products: [
        {
          src: productImage,
          title: "Women Printed Kurta",
          // description: "Neque porro quisquam est qui dolorem ipsum quia",
          description: "Description",
          price: "1500",
          discount: "2400",
          off: "40% Off",
          rating: "rating",
          purchases: "56580",
        },
        {
          src: productImage2,
          title: "HRX By Hritik Roshan",
          // description: "Neque porro quisquam est qui dolorem ipsum quia",
          description: "Description",
          price: "2499",
          discount: "3000",
          off: "50% Off",
          rating: "rating",
          purchases: "60000",
        },
        {
          src: productImage,
          title: "Women Printed Kurta",
          description: "description",
          price: "price",
          discount: "discount",
          off: "percentage_off",
          rating: "rating",
          purchases: "purchases",
        },
      ],
    };

    const Item = ({
      src,
      title,
      desc,
      price,
      discount,
      off,
      rating,
      purchases,
    }) => {
      return (
        <TouchableOpacity style={styles.ProductCard}>
          <Image source={src} height={80} width={50} />
          <Text style={styles.ProductCardTitle}>{title}</Text>
          <Text style={styles.ProductCardDesc}>{desc}</Text>
          <Text style={styles.ProductCardPrice}>₹{price}</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 4,
              display: "flex",
              alignContent: "center",
              textAlign: "center",
            }}
          >
            <Text style={styles.ProductCardDiscount}>₹{discount}</Text>
            <Text style={styles.ProductCardOff}>{off}</Text>
          </View>
          {/* <Text style={styles.ProductCardRating}>{rating}</Text> */}
          <Text style={styles.ProductCardPurchases}>{purchases}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <ScrollView horizontal={true} style={styles.HorizontalCatalogue}>
        {items.products.map((item, index) => (
          <Item
            key={index}
            src={item.src}
            title={item.title}
            desc={item.description}
            price={item.price}
            discount={item.discount}
            off={item.off}
            rating={item.rating}
            purchases={item.purchases}
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <ScrollView style={styles.Container} horizontal={false} bounces={false}>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.SearchBox}
        placeholder="Search Any Product"
      />

      <View style={styles.FilterBar}>
        <Text>All Featured</Text>
        <View style={{ flexDirection: "row", display: "flex", gap: 4 }}>
          <TouchableOpacity
            style={{
              padding: 8,
              backgroundColor: "white",
              width: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 12,
              backgroundColor: "white",
              width: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Sort</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CategoryBar />

      <Banner src={offer1} />

      <CurrentDeal />

      <HorizontalCatalogue />

      <Banner src={banner2} />
      <CurrentDeal2 />
      <HorizontalCatalogue />
    </ScrollView>
  );
};

export default home;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 16,
    display: "flex",
    gap: 12,
  },

  SearchBox: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
  },

  FilterBar: {
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  BannerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  CurrentDealContainer: {
    backgroundColor: "#4392F9",
    padding: 8,
    borderRadius: 8,
    display: "flex",
    gap: 4,
    marginBottom: 8,
  },

  DealText: {
    color: "white",
  },

  HorizontalCatalogue: {
    flex: 1,
    // backgroundColor: "black",
    marginBottom: 12,
  },

  // PRODUCT CARD STYLES
  ProductCard: {
    // height: 100,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    // flexWrap: "wrap",
    // backgroundColor: "gray",
    margin: 8,
  },

  ProductCardTitle: { fontSize: 16, fontWeight: 500, paddingVertical: 2 },

  ProductCardDesc: { fontSize: 12, paddingVertical: 4 },

  ProductCardPrice: {},

  ProductCardDiscount: { color: "gray", textDecorationLine: "line-through" },

  ProductCardOff: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    justifyContent: "center",
  },

  ProductCardPurchases: { color: "gray" },
});
