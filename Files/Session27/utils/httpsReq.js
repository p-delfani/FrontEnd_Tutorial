
const fetchData = async () =>{
    const res = await fetch("data.json");
    const json = await res.json();
    return json;
}

export {fetchData};


