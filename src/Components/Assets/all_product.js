import p1_img from '../Assets/men1.jpg'
import p2_img from '../Assets/men2.jpg'
import p3_img from '../Assets/men3.jpg'
import p4_img from '../Assets/men4.jpg'
import p5_img from '../Assets/men5.jpg'
import p6_img from '../Assets/men6.jpg'
import p7_img from '../Assets/men7.jpg'
import p8_img from '../Assets/men8.jpg'
import p9_img from '../Assets/men9.jpg'
import p10_img from '../Assets/men10.jpg'
import p11_img from '../Assets/col3.jpg'
import p12_img from '../Assets/col5.jpg'
// import p13_img from '../Assets/col7.jpg'
import wo1_img from '../Assets/wo1.jpg'
import wo2_img from '../Assets/wo2.jpg'
import wo3_img from '../Assets/wo3.jpg'
import wo4_img from '../Assets/wo4.jpg' 
import wo5_img from '../Assets/wo5.jpg'
import wo6_img from '../Assets/wo6.webp'
import wo7_img from '../Assets/wo7.jpg'
import wo8_img from '../Assets/wo8.jpg'
import wo9_img from '../Assets/wo9.jpg'
import wo10_img from '../Assets/wo10.png'
import wo11_img from '../Assets/wo11.png'
import kid1_img from '../Assets/col2.jpg'
import kid2_img from '../Assets/kid1.jpg'
import kid3_img from '../Assets/kid2.jpg'
import kid4_img from '../Assets/kid3.jpg'
import kid5_img from '../Assets/kid4.jpg'
import kid6_img from '../Assets/kid5.jpg'
import kid7_img from '../Assets/kid6.jpg'
import kid8_img from '../Assets/kid7.jpg'



let all_product = [
    {
        id: 1,
        name: "half-sleeve white cotton shirt",
        category: "men",
        image: p1_img,
        new_price: 50.00,
        old_price: 80.00,
    },
    {
        id: 2,
        name: "Ladies short straight dress - Black",
        category: "men",
        image: p2_img,
        new_price: 40.00,
        old_price: 70.00,
    },
    {
        id: 3,
        name: "Ladies Half Lined Blazer - Dusty Rose",
        category: "men",
        image: p3_img,
        new_price: 100.00,
        old_price: 140.00,
    },
    {
        id: 4,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "men",
        image: p4_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 5,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "men",
        image: p5_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 6,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "men",
        image: p6_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 7,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "men",
        image: p7_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 8,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "men",
        image: p8_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 9,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "men",
        image: p9_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 10,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "men",
        image: p10_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 11,
        name: "Tank Top femme Nike Dri-FIT",
        category: "women",
        image: wo1_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 12,
        name: "Nike Sportswear Red Ambush",
        category: "women",
        image: wo2_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 13,
        name: "Orange Pure Silk Maxi Dress",
        category: "women",
        image: wo3_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 14,
        name: "Banana Labs Ruffles Crop Top",
        category: "women",
        image: wo4_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 15,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "women",
        image: wo5_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 16,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "women",
        image: wo6_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 17,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "women",
        image: wo7_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 18,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "women",
        image: wo11_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 19,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "women",
        image: wo8_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 20,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "women",
        image: wo9_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 21,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "women",
        image: wo10_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 22,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "kids",
        image: kid1_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 23,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "kids",
        image: kid2_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 24,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "kids",
        image: kid3_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 25,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "kids",
        image: kid4_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 26,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "kids",
        image: kid5_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 27,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "kids",
        image: kid6_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 28,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "kids",
        image: kid7_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 29,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "kids",
        image: kid8_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 30,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "men",
        image: p11_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    {
        id: 31,
        name: " Print Smile-Half Sleve Plain T-shirt",
        category: "men",
        image: p12_img,
        new_price: 80.00,
        old_price: 120.00,
    },
    // {
    //     id: 32,
    //     name: " Print Smile-Half Sleve Plain T-shirt",
    //     category: "men",
    //     image: p13_img,
    //     new_price: 80.00,
    //     old_price: 120.00,
    // },
];

export default all_product;