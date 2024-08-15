import { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { IoPricetags } from "react-icons/io5";

const Bikes = () => {
    const [bikes, setBikes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBikes, setFilteredBikes] = useState([]);

    useEffect(() => {
        fetch('bikes.json')
            .then(res => res.json())
            .then(data => {
                setBikes(data);
                setFilteredBikes(data);
            });
    }, []);

    useEffect(() => {
        const results = bikes.filter(bike =>
            bike.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBikes(results);
    }, [searchTerm, bikes]);

    return (
        <div className="mx-8 my-16">
            <div>
                <h2 className="text-5xl font-semibold text-center mb-8">Explore All Bikes</h2>
                <p className="text-xl text-center mx-32 mb-6">
                    Discover a diverse collection of bikes tailored to every rider's needs. Explore detailed information on each model to find the perfect bike for your adventures.
                </p>
            </div>

            <div className="mb-8 text-center">
                <input
                    type="text"
                    placeholder="Search for a bike"
                    className="px-4 py-2 border border-gray-300 shadow-xl rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-3 gap-3">
                {
                    filteredBikes.map(bike => (
                        <div key={bike.id}>
                            <div className="card card-compact bg-sky-100/35 w-96 shadow-xl">
                                <img src={bike.image} alt="" className="h-64 rounded-t-xl" />
                                <div className="card-body h-72 text-xl">
                                    <h2 className="card-title text-3xl font-semibold">{bike.name}</h2>
                                    <div className="flex justify-between">
                                        <h2 className="text-xl"><span className="font-semibold">Brand :</span> {bike.brand}</h2>
                                        <h2 className="text-xl"><span className="font-semibold">Category :</span> {bike.category}</h2>
                                    </div>
                                    <p className="text-lg">{bike.description}</p>
                                    <div className="flex justify-between gap-24 text-lg">
                                        <p className="flex gap-2 items-center"><FaRegStar /> {bike.rating}</p>
                                        <p className="flex gap-2 items-center"><CiCalendarDate /> {bike.product_creation_date}</p>
                                    </div>
                                    <div className="flex justify-between gap-24 text-lg">
                                        <p className="flex gap-2 items-center"><IoPricetags /> {bike.price}$</p>
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
