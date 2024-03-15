import React, { useEffect, useState } from "react";
import './prodDetail.css'
import axios from "axios";
import Footer from "./Footer";
import Swal from 'sweetalert2'

function ProdDetail() {
    const [singleProduct, setSingleProduct] = useState("");
    const [prodID, setProdID] = useState("");
    const [catId, setCatId] = useState("");
    const [similerProduct, setSimilerProduct] = useState([]);
    const [singlePrice, setSinglePrice] = useState("");
    const [DiscountedPrice, setDiscountedPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [userName, setUserName] = useState("");
    const [paymentID, setPaymentID] = useState("");

    console.log(localStorage.getItem('buyBtnID'));

    const localToken = localStorage.getItem('userToken');

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://api.escuelajs.co/api/v1/auth/profile',
            headers: {
                Authorization: `Bearer ${localToken}`,
            }
        }).then((res) => {
            setUserName(res.data.name);
        })
    }, [])

    useEffect(() => {
        setDiscount(singlePrice / 100 * 20)
        setDiscountedPrice(singlePrice - discount);
    })

    useEffect(() => {
        setProdID(localStorage.getItem('buyBtnID'));
    }, [])

    console.log(prodID);

    useEffect(() => {
        if (prodID) {
            axios.get(`https://api.escuelajs.co/api/v1/products/${prodID}`)
                .then(response => {
                    setSingleProduct(response.data);
                    console.log("Single Product:", response.data);
                    setCatId(response.data.category.id);
                    console.log('Catego ID', catId);
                    setSinglePrice(response.data.price * 10);
                    console.log(singlePrice, 'Single Price 10');
                })
                .catch(error => {
                    console.error("Error fetching product:", error);
                });
        }
    }, [prodID]);


    useEffect(() => {
        if (catId) {
            axios.get(`https://api.escuelajs.co/api/v1/categories/${catId}/products?offset=0&limit=5`)
                .then(response => {
                    setSimilerProduct(response.data);
                    console.log("Similer products:", response.data);
                })
                .catch(error => {
                    console.error("Error fetching product:", error);
                });
        }
    }, [catId]);



    // DEMO RAZORPAY

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;

            script.onload = () => {
                resolve(true);
            };

            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    const initializeRazorpay = (DiscountedPrice) => {
        const options = {
            key: "rzp_test_0ZMfbjrmGjb8xt",
            currency: "INR",
            amount: DiscountedPrice * 100,
            name: `${userName}`,
            description: 'Thanks',
            handler: function (response) {
                // alert(response.razorpay_payment_id);
                // alert("Payment successful");
                console.log(response);
                setPaymentID(response.razorpay_payment_id);
                Swal.fire({
                    title: "Payment successful",
                    text: `Payment Reciept ID:  ${response.razorpay_payment_id}`,
                    icon: "success"
                })

            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };


    // const [DiscountedPrice, setDiscountedPrice] = useState(0);

    const handleProceedToPay = () => {
        loadRazorpayScript();
    };

    const loadRazorpayScript = async () => {
        const loaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (loaded) {
            console.log('Razorpay script loaded successfully');
            initializeRazorpay(DiscountedPrice);
        } else {
            console.error('Failed to load Razorpay script');
        }
    };

    useEffect(() => {
        // Your useEffect will be triggered only when the 'DiscountedPrice' state changes
        // (assuming it's updated when the user selects items or performs relevant actions)
    }, [DiscountedPrice]);

    // RAZOR PAY END 



    return (
        <>
            <div className='container'>
                <div className="container my-5">
                    <div>
                        <div className="row">
                            <div className="col-md-5">
                                <div className="main-img">
                                    {/* Display the first image */}
                                    {singleProduct?.images?.length > 0 && <img className="img-fluid" src={singleProduct.images[0]} alt="Product" />}
                                    <div className="row my-3 previews">
                                        {/* Map through the rest of the images and display them */}
                                        {singleProduct.images?.slice(1).map((imageUrl, index) => (
                                            <div className="col-md-6" key={index}>
                                                <img className="w-100" src={imageUrl} alt="Sale" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="main-description">
                                    <div className="category text-bold">
                                        <span>Category:</span> {singleProduct?.category?.name}
                                    </div>
                                    <div className="product-title text-bold my-3">
                                        {singleProduct.title}
                                    </div>


                                    <div className="price-area my-3">
                                        <p className="old-price mb-1"><del>₹ {singlePrice}</del> <span className="old-price-discount text-danger">(20% off)</span></p>
                                        <p className="new-price text-bold mb-1">₹ {DiscountedPrice}</p>
                                        <p className="text-secondary mb-1 info_text">(Additional tax may apply on checkout)</p>

                                    </div>

                                </div>

                                <div className="product-details my-4">
                                    <p className="details-title text-color mb-1 text-dark text-bold fw-bold">Product Details</p>
                                    <p className="description">{singleProduct.description}</p>
                                </div>

                                <div>

                                    <select className="size_selector">
                                        <option value="Null">Select Size</option>
                                        <option value="xs">Xs</option>
                                        <option value="s">S</option>
                                        <option value="m">M</option>
                                        <option value="l">L</option>
                                        <option value="xl">Xl</option>
                                        <option value="xxl">Xxl</option>
                                    </select>

                                </div>


                                <div className="delivery my-4">
                                    <p className="font-weight-bold mb-0"><span><i className="fa-solid fa-truck"></i></span> <b>Delivery done in 3 days from date of purchase</b> </p>
                                    <p className="text-secondary">Order now to get this product delivery</p>
                                </div>
                                <div className="delivery-options my-4">
                                    <p className="font-weight-bold mb-0"><span><i className="fa-solid fa-filter"></i></span> <b>Delivery options</b> </p>
                                    <p className="text-secondary">View delivery options here</p>
                                </div>

                                <div className="buttons d-flex my-4 mt-5">
                                    <div className="block">
                                        <button className="btn btn-dark px-4 py-2">Add to cart</button>
                                    </div>
                                    <div className="block">
                                        <a href="#" className="shadow btn btn-success px-4 py-2" onClick={() => handleProceedToPay(DiscountedPrice.toFixed(2))}>Proceed To Pay</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>



                <div className="container similar-products my-4">
                    <hr />
                    <p className="display-5">Similar Products</p>

                    <div className="row">
                        {similerProduct.slice(1).map((item) => {
                            return (
                                <div className="col-md-3">
                                    <div className="similar-product">
                                        {singleProduct?.images?.length > 0 && <img className="w-100 sim_img" src={item.images[0]} alt="Preview" />}
                                        <p className="title">{item.title}</p>
                                        <p className="price">₹ {item.price * 10}</p>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                </div>




            </div>
            <Footer />
        </>
    )
}

export default ProdDetail