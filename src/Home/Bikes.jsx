import { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { IoPricetags } from "react-icons/io5";

const Bikes = () => {
    const [bikes, setBikes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [filteredBikes, setFilteredBikes] = useState([]);
    const [sortOrder, setSortOrder] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetch('http://localhost:5000/bikes')
            .then(res => res.json())
            .then(data => {
                setBikes(data);
                setFilteredBikes(data);
            })
            .catch(error => console.error("Error fetching bikes data:", error));
    }, []);

    useEffect(() => {
        filterBikes();
    }, [searchTerm, brand, category, priceRange]);

    useEffect(() => {
        sortBikes();
    }, [sortOrder]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, brand, category, priceRange, sortOrder]);

    const filterBikes = () => {
        let results = bikes;

        if (searchTerm) {
            results = results.filter(bike =>
                bike.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (brand) {
            results = results.filter(bike => bike.brand === brand);
        }

        if (category) {
            results = results.filter(bike => bike.category === category);
        }

        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split('-').map(Number);
            if (!isNaN(minPrice) && !isNaN(maxPrice)) {
                results = results.filter(bike => bike.price >= minPrice && bike.price <= maxPrice);
            }
        }

        setFilteredBikes(results);
    };

    const sortBikes = () => {
        let results = [...filteredBikes];

        if (sortOrder === "low-to-high") {
            results = results.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "high-to-low") {
            results = results.sort((a, b) => b.price - a.price);
        } else if (sortOrder === "newest-first") {
            results = results.sort((a, b) => new Date(b.product_creation_date) - new Date(a.product_creation_date));
        }

        setFilteredBikes(results);
    };

    const handleSearch = () => {
        filterBikes();
    };

    const handleReset = () => {
        setSearchTerm("");
        setBrand("");
        setCategory("");
        setPriceRange("");
        setSortOrder("");
        setFilteredBikes(bikes);
        setCurrentPage(1);
    };

    const indexOfLastBike = currentPage * itemsPerPage;
    const indexOfFirstBike = indexOfLastBike - itemsPerPage;
    const currentBikes = filteredBikes.slice(indexOfFirstBike, indexOfLastBike);
    const totalPages = Math.ceil(filteredBikes.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

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
                <button
                    onClick={handleSearch}
                    className="ml-4 px-4 py-2 font-semibold bg-blue-500 text-white rounded shadow-xl"
                >
                    Search
                </button>
                <select
                    className="ml-4 px-4 py-2 border border-gray-300 shadow-xl rounded"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                >
                    <option value="">Select Brand</option>
                    <option value="Kawasaki">Kawasaki</option>
                    <option value="BMW">BMW</option>
                    <option value="Yamaha">Yamaha</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="KTM">KTM</option>
                    <option value="Bajaj">Bajaj</option>
                    <option value="Apache">Apache</option>
                </select>
                <select
                    className="ml-4 px-4 py-2 border border-gray-300 shadow-xl rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value="SuperSport">SuperSport</option>
                    <option value="Standard">Standard</option>
                    <option value="Sport">Sport</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Naked">Naked</option>
                    <option value="Touring">Touring</option>
                    <option value="Cruiser">Cruiser</option>
                    <option value="Sport Heritage">Sport Heritage</option>
                    <option value="Commuter">Road</option>
                </select>
                <select
                    className="ml-4 px-4 py-2 border border-gray-300 shadow-xl rounded"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                >
                    <option value="">Select Price Range</option>
                    <option value="0-5000">0-5000$</option>
                    <option value="5001-10000">5001-10000$</option>
                    <option value="10001-20000">10001-20000$</option>
                    <option value="20001-30000">20001-30000$</option>
                    <option value="30001-40000">30001-40000$</option>
                </select>
                <select
                    className="ml-4 px-4 py-2 border border-gray-300 shadow-xl rounded"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                    <option value="newest-first">Date Added: Newest First</option>
                </select>

                <button
                    onClick={handleReset}
                    className="ml-4 px-4 py-2 font-semibold bg-gray-500 text-white rounded shadow-xl"
                >
                    Reset
                </button>
            </div>

            {currentBikes.length === 0 ? (
                <p className="text-2xl text-center">No Bikes found</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {currentBikes.map(bike => (
                        <div key={bike.id}>
                            <div className="card card-compact bg-sky-100/35 w-full shadow-xl">
                                <img src={bike.image} alt="" className="h-64 w-full rounded-t-xl object-cover" />
                                <div className="card-body text-xl">
                                    <h2 className="card-title text-3xl font-semibold">{bike.name}</h2>
                                    <div className="flex justify-between">
                                        <h2 className="text-xl"><span className="font-semibold">Brand:</span> {bike.brand}</h2>
                                        <h2 className="text-xl"><span className="font-semibold">Category:</span> {bike.category}</h2>
                                    </div>
                                    <p className="text-lg mt-2">{bike.description}</p>
                                    <div className="flex justify-between mt-4 text-lg">
                                        <p className="flex gap-2 items-center"><FaRegStar /> {bike.rating}</p>
                                        <p className="flex gap-2 items-center"><CiCalendarDate /> {bike.product_creation_date}</p>
                                    </div>
                                    <div className="flex justify-between mt-2 text-lg">
                                        <p className="flex gap-2 items-center"><IoPricetags /> {bike.price}$</p>
                                        <p><span className="font-semibold">Warranty:</span> {bike.warranty}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center my-8">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 mx-2 font-semibold bg-blue-500 text-white rounded shadow-xl disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2">{currentPage} / {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 mx-2 font-semibold bg-blue-500 text-white rounded shadow-xl disabled:opacity-50"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Bikes;
