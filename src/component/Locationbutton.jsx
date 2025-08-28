import React,{useEffect, useState} from 'react'

export const Locationbutton = ({setValidator}) => {
    const [query,setQuery] = useState('');
    const [results,setResults] = useState('');
    const [visable,setVisable] = useState(false);

    const handleSearch = async (e) => {
        if(!e.currentTarget.value && visable === true){
            setVisable(false)
        }
        
        const value = e.target.value;
        setQuery(value);
        if(value.length>2){
            try{
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${value}&addressdetails=1&limit=5&countrycodes=in`
                )
                const data = await res.json();
                setResults(data);
                
            }catch(error){
                console.log('Error fatching the location',error);
                
            }
        }else{
                setResults([])
            }
    }

    const [locality,setLocality] = useState('');

      useEffect(() => {
        if (setValidator) {
          setValidator(validateForm);
        }
      }, [locality]);
      
      function validateForm(){
        if(!locality){
            alert("Enter your city name");
            return false;
        }
        return true
      }

    const handleSelect = (place) => {
        
        // setQuery(place.display_name);
        console.log(place.address);
        if(place.address.village || place.address.city || place.address.town){
            if(place.address.village){
                setQuery(place.address.village)
            }
            else if(place.address.city){
                setQuery(place.address.city)
            }
            else if(place.address.town){
                setQuery(place.address.town)
            }
        }
        setVisable(true)
        
        setResults([]);
    }


  return (
    <div className='p-4'>
        <h2 className='text-xl font-medium mb-5'>Where is your property located?</h2>
        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
        <input type="text" value={query} onChange={handleSearch} id="first_name" class=" w-[30vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter City" required />
        {results.length > 0 && (
            <ul className='border border-gray-200 mt-2 rounded-lg shadow-md bg-white max-h-48 overflow-y-auto'>
                {results.map((item)=>{return(
                    <li key={item.place_id}
                    onClick={() => handleSelect(item)}
                    className='px-3 py-2 hover:bg-gray-100 cursor-pointer'
                    >
                        {item.display_name}
                    </li>
                )})}
            </ul>
        )}
        <label for="first_name" class={`${visable === false ? 'hidden':'block my-5 text-sm font-medium text-gray-900 dark:text-white'}`}>Locality</label>
        <input type="text" value={locality} onChange={(e) => setLocality(e.currentTarget.value)} id="first_name" class={`${visable === false ? 'hidden':'w-[30vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}`} placeholder="Enter City" required />
        
    </div>
  )
}
