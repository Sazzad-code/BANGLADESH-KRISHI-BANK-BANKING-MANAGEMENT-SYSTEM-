
import { message } from "antd";

import PageTitle from "../../components/PageTitle";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

function Home() {

    const { user } = useSelector(state => state.users);

    const images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXByOdoEflY5nM_kNl_E53Px5v5DVO7H2VFQ&s",
        "https://ib.krishibank.org.bd/assets/images/bkb_left_logo.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxP6N7jWsi-XuQnKpr1JMdEAPPpylBP15hAg&s",
    ];

    return <div>

        <div className="swiper-container">
            <img style={{height:"400px", padding: "60px 0"}} className="w-full" src={`${images[1]}`}></img>
    
    </div>
    <div className="welcome">
            <PageTitle title={`
            Hello ${user.firstName} ${user.lastName}, Welcome to Bangladesh Krishi Bank`} />
        </div>
        <div className="intro">
            <h1 className="text-sm  mb-4">Bangladesh Krishi Bank (BKB) is a state-owned specialized financial institution in Bangladesh, established with the primary goal of promoting and supporting the agricultural sector, which is the backbone of the country’s economy. Since its inception in 1973 under the Bangladesh Krishi Bank Order, BKB has been playing a vital role in uplifting rural livelihoods by providing financial assistance to farmers, agribusinesses, and other related industries.</h1>
            <h1 className="text-sm  mb-4">With a vast network of branches across urban and rural areas, Bangladesh Krishi Bank is committed to driving economic growth by empowering farmers and ensuring sustainable development in agriculture. The institution's emphasis on innovation and community-focused banking solutions underscores its dedication to creating a prosperous and self-reliant rural economy.</h1>
        </div>
    </div>
}

export default Home;