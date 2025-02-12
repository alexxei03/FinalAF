import { useState, useEffect, useRef } from "react";
import "./css/Search.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const searchRef = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      setResults([
        {
          id: 1,
          title: "Курс по React",
          mentor: "Иван Иванов",
          price: "10 000₸",
          link: "/courses/1/",
        },
        {
          id: 2,
          title: "Основы блокчейна",
          mentor: "Петр Петров",
          price: "12 000₸",
          link: "/courses/2/",
        },
      ]);
      setIsPanelOpen(true);
    } else {
      setResults([]);
      setIsPanelOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsPanelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="nav-search-wrapper" ref={searchRef}>
      <div className="nav-search">
        <div className="nav-search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
          >
            <path
              d="M17.2504 29.5569C24.1779 29.5569 29.7938 23.9853 29.7938 17.1124C29.7938 10.2395 24.1779 4.66797 17.2504 4.66797C10.3229 4.66797 4.70703 10.2395 4.70703 17.1124C4.70703 23.9853 10.3229 29.5569 17.2504 29.5569Z"
              stroke="black"
              strokeWidth="2.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M32.9279 32.6661L26.1074 25.8994"
              stroke="black"
              strokeWidth="2.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
        <input
          className="nav-search-input"
          type="text"
          placeholder="Поиск курса"
          value={query}
          onChange={handleSearch}
        />
      </div>

      {isPanelOpen && (
        <div className="nav-search-inp-container">
          <div className="nav-search-inp-box">
            {results.length > 0 ? (
              results.map((result) => (
                <div key={result.id} className="srch-elem">
                  <div className="srch-elem-info">
                    <div className="nav-search-h1">{result.title}</div>
                    <div className="srch-elem-info2">
                      <div className="nav-search-h2">{result.mentor}</div>
                      <div className="nav-search-h2 nav-search-h3">
                        {result.price}
                      </div>
                    </div>
                  </div>
                  <div className="srch-elem-info3">
                    <a href={result.link}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <rect
                          width="31.4286"
                          height="31.4286"
                          rx="4.28571"
                          transform="matrix(-1 0 0 1 31.5703 0.285156)"
                          fill="#F5F9FF"
                        ></rect>
                        <path
                          d="M13 21.166L19.3333 15.6504L13 10.1348"
                          stroke="#0066FF"
                          strokeWidth="2.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div id="notFoundSearchBox">Курс не найден.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
