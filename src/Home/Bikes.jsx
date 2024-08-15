import { useEffect, useState } from "react";

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
                            <div className="card card-compact bg-base-100 w-96 shadow-xl">
                                <img src={bike.image} alt="" className="h-72"/>
                                <div className="card-body">
                                    <h2 className="card-title">{bike.name}</h2>
                                    <p>If a dog chews shoes whose shoes does he choose?</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Buy Now</button>
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