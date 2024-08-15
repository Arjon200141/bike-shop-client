import { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { IoPricetags } from "react-icons/io5";

const Bikes = () => {
    const [bikes, setBikes] = useState([]);
    useEffect(() => {
        fetch('bikes.json')
            .then(res => res.json())
            .then(data => setBikes(data))
    }, [])
    return (
        <div className="mx-8 my-16">
            <div></div>
            <div className="grid grid-cols-3 gap-3">
                {
                    bikes.map(bike => (
                        <div key={bike.id}>
                            <div className="card card-compact bg-sky-100/35 w-96 shadow-xl">
                                <img src={bike.image} alt="" className="h-64 rounded-t-xl"/>
                                <div className="card-body h-72 text-xl">
                                    <h2 className="card-title text-3xl font-semibold">{bike.name}</h2>
                                    <div className="flex justify-between">
                                    <h2 className="text-xl"><span className="font-semibold">Brand :</span>{bike.brand}</h2>
                                    <h2 className="text-xl"><span className="font-semibold">Category :</span>{bike.category}</h2>
                                    </div>
                                    <p className="text-lg">{bike.description}</p>
                                    <div className="flex justify-between gap-24 text-lg">
                                        <p className="flex gap-2 items-center"><FaRegStar />{bike.rating}</p>
                                        <p className="flex gap-2 items-center"><CiCalendarDate />{bike.product_creation_date}</p>
                                    </div>
                                    <div className="flex justify-between gap-24 text-lg">
                                        <p className="flex gap-2 items-center"><IoPricetags />{bike.price}$</p>
                                        <p><span className="font-semibold">Warranty : </span>{bike.warranty}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Bikes;