import './App.css';
import {useState, useEffect} from 'react';

function App() {

  const [data, setData] = useState(
    [
      {
        "employeeId": 1,
        "name": "Guy Gardner",
        "managerId": 15
      },
      {
        "employeeId": 2,
        "name": "Arthur Curry",
        "managerId": 12
      },
      {
        "employeeId": 3,
        "name": "John Stewart",
        "managerId": 7
      },
      {
        "employeeId": 4,
        "name": "Ray Palmer",
        "managerId": 6
      },
      {
        "employeeId": 5,
        "name": "Jessica Cruz",
        "managerId": 15
      },
      {
        "employeeId": 6,
        "name": "Shayera Hol",
        "managerId": 12
      },
      {
        "employeeId": 7,
        "name": "Bruce Wayne",
        "managerId": 17
      },
      {
        "employeeId": 8,
        "name": "Kyle Rayner",
        "managerId": 15
      },
      {
        "employeeId": 9,
        "name": "Billy Batson",
        "managerId": 6
      },
      {
        "employeeId": 10,
        "name": "Kiliwog",
        "managerId": 3
      },
      {
        "employeeId": 11,
        "name": "Dinah Drake",
        "managerId": 7
      },
      {
        "employeeId": 12,
        "name": "Diana Prince",
        "managerId": 17
      },
      {
        "employeeId": 13,
        "name": "Sinestro",
        "managerId": 3
      },
      {
        "employeeId": 14,
        "name": "J'onn J'onzz",
        "managerId": 12
      },
      {
        "employeeId": 15,
        "name": "Hal Jordan",
        "managerId": 3
      },
      {
        "employeeId": 16,
        "name": "Oliver Queen",
        "managerId": 7
      },
      {
        "employeeId": 17,
        "name": "Clark Kent"
      },
      {
        "employeeId": 18,
        "name": "Zatanna Zatara",
        "managerId": 7
      },
      {
        "employeeId": 19,
        "name": "Barry Allen",
        "managerId": 17
      }
    ]
  )

  const [defaultData, setDefaultData] = useState([])

  const [tree, setTree] = useState([])
  const [searchText, setSearchText] = useState('')

  const kid = (p, c) => {
    if (p.hasOwnProperty('kids')) {
      p.kids.push(c);
    } else {
      p.kids = [c];
    }  
  };

  const generateTree = (defaultData) => {   
    const table1 = JSON.parse(JSON.stringify(defaultData));

    for (let i = 0; i < table1.length - 1; i++) {
      const a = table1[i];
      for (let j = i + 1; j < table1.length; j++) {
        const b = table1[j];
        if (a.employeeId === b.managerId) {
          kid(a, b);
        } else if (b.employeeId === a.managerId) {
          kid(b, a);
        }
      }
    }
    
    const result1 = table1.filter((x) => !x.managerId);
    setDefaultData(result1)
    setTree(result1)
  }
  
  useEffect(()=>{
    generateTree(data)
  },[])

  const findChildByText = (text, currentData) => {
    const table1 = JSON.parse(JSON.stringify(currentData));

    if(table1) {
      const result = table1.find(e => e.name.toLowerCase().includes(text.toLowerCase()))
      if (result) {
        setTree([result])
        return
      }
    }
    for (const item of table1) {
      if(item.kids){
        const result = item.kids.find(e => e.name.toLowerCase().includes(text.toLowerCase()))
        if (result) {
          setTree([result])
          return
        } else {
          findChildByText(text, item.kids)
        }
      }
    }
  }

  const handleSearchButton = () => {
    if(searchText === '') {
      setTree(defaultData)
    } else {
      findChildByText(searchText, defaultData)
    }
  }

  const NestedTree = ({tree}) => {
    return (
    <ul>
      {tree.map((item, index) => {
        if(item) {
          if(item.kids) {
            return(
              <>
                <li className='py-1' key={`${index}${item.name}`}>{item.name}</li>
                <ul className='ml-4 sub-tree'>
                  <NestedTree key={`${index}${item.name}`} className="ml-4" tree={item.kids} />
                </ul>
              </>
            )
          } else {
            return (<li className='py-1' key={`${index}${item.name}`}>{item.name}</li>)
          }
        } else {
          return (<p>Hero not found.</p>)
        }
      })}
    </ul>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <main className='mt-4'>  
          <p>Search Superhero</p>
          
          <div className='flex'>
            <input 
              className='mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
              type="text" 
              name="notsearch" 
              onChange={e => setSearchText(e.target.value)}
            />
            <button className='ml-4' onClick={() => handleSearchButton()}>Search</button>
          </div>
          <div>
            {/* parent */}
            <div className='text-left mt-4'>
              {/* {parent} */}
              <NestedTree tree={tree}/>
            </div>
          </div>
        </main>
      </header>

    </div>
  );
}

export default App;
