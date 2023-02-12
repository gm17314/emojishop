import React, { useEffect, useState } from "react";
import styled from "styled-components";
import data from "./Emoji.json";

const Heading = styled.h1`
  font-size: 8rem;
  text-shadow: 0 0 0.4rem;
  font-family: "Courier New", Courier, monospace;
  font-variant: small-caps;
  text-align: center;
  padding-top: 3rem;
  margin: 3.6rem;
  margin-top: 0;
`;
const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Search = styled.input`
  width: 80%;
  padding: 0.3rem 0.5rem;
  color: #6b6363;
  background-color: #00807205;
  border: 1px solid grey;
  border-radius: 0.6rem;
  box-shadow: 0 0 0.1rem 0.1rem grey;
  outline: 0;
  font-size: 3.7rem;
  font-family: monospace;
`;
const EmojiBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const EmojiCard = styled.div`
  width: 25%;
  margin: 3rem;
  margin-bottom: 0;
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f8f6f6;
  box-shadow: 0 0 0.1rem 0.1rem grey;
  border-radius: 1rem;
  @media (max-width: 700px) {
    width: 70%;
    margin: 3rem;
  }
`;
const Emoji = styled.span`
  font-size: 4rem;
  text-shadow: 0 0 1rem;
  @media (max-width: 700px) {
    font-size: 5rem;
  }
`;
const Button = styled.button`
  font-size: 3.5rem;
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  padding: 0.2rem 0.4rem;
  color: white;
  cursor: pointer;
  background-color: black;
  border-radius: 1rem;
  transition: all 0.2s;
  &:active {
    transform: scale(0.96);
    color: grey;
  }
  @media (max-width: 700px) {
    font-size: 4rem;
  }
`;
const NoResult = styled.h2`
  font-size: 5rem;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: #3a3131;
  text-align: center;
  padding-top: 3rem;
  margin: 3.6rem;
  margin-top: 0;
`;
const Top = styled.span`
    font-size: 3.5rem;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    cursor: pointer;
    color: black;
    @media (max-width: 700px) {
    font-size: 7rem;
    
  }
`

const Home = () => {
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(20);

  const CopyEmoji = (emoj) => {
    navigator.clipboard.writeText(emoj);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight
      )
        setCount((prev) => prev + 10);
    });
  }, []);
  return (
    <>
      <Heading>EmojiShop</Heading>
      <Top onClick={()=>window.scroll(0,0)}>🔝</Top>
      <Div>
        <Search
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search Emoji..."
        />
      </Div>
      <EmojiBox>
        {data.filter((emoji) =>
          emoji.keywords.includes(search.toLocaleLowerCase())
        ).length === 0 ? (
          <NoResult>No Result Found😞</NoResult>
        ) : (
          data
            .filter((emoji) =>
              emoji.keywords.includes(search.toLocaleLowerCase())
            )
            .slice(0, count)
            .map((emoji) => (
              <EmojiCard key={emoji.title}>
                <Emoji>{emoji.symbol}</Emoji>
                <Button onClick={() => CopyEmoji(emoji.symbol)}>Copy</Button>
              </EmojiCard>
            ))
        )}
      </EmojiBox>
    </>
  );
};

export default Home;
