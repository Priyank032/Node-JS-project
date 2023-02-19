import React, { useState, useEffect } from 'react'
const Getedit = () => {

    const [user, setUser] = useState([]);
    const [serchInput, setSearchInput] = useState("");
    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        const response = await fetch('http://localhost:3001/api/apidata');
        const data = await response.json();
        console.log(data);
        setUser(data)
    }

    const handleSearch = (value) => {
        setSearchInput(value)
        const filteredUser = user.filter(function (item) {
            console.log("category", item.category)
            console.log("search", value)
            if (item.category)
                return item.category.toUpperCase().startsWith(value.toUpperCase())
            else
                return false
        })

        console.log(filteredUser);
        setUser(filteredUser);
    }

    return <>
        <div>
            <input type="text" value={serchInput} onChange={(event) => handleSearch(event.target.value)} />
        </div>
        <table>
            <thead>
                <tr>
                    <th>companyCode</th>
                    <th>companyName </th>
                    <th>category</th>
                </tr></thead>
            {user.map((item, index) =>
                <tbody>
                    <tr key={item._id}>
                        <td>{item.companyCode}</td>
                        <td>{item.companyName}</td>
                        <td>{item.category}</td>
                    </tr>
                </tbody>)}


        </table>




    </>
}
export default Getedit