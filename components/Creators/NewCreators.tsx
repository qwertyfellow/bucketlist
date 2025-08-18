import React from "react"
import CreatorCard from "./CreatorCard";

const NewCreators = () => {

    const creators = [
    {
      image: "https://images.unsplash.com/photo-1742201835839-33a959b5d97e?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Sarah Travels",
      storiesCount: 12,
      viewsCount: 4200,
    },
    {
      image: "https://images.unsplash.com/photo-1712408175698-95ff4bc916b7?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Nomadic Jack",
      storiesCount: 8,
      viewsCount: 3100,
    },
    {
      image: "https://picsum.photos/seed/picsum/300/300",
      name: "Sarah Travels",
      storiesCount: 12,
      viewsCount: 4200,
    },
    {
      image: "https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
      name: "Nomadic Jack",
      storiesCount: 8,
      viewsCount: 3100,
    },
  ];

  const renderCreatorCards = () => {
    return (
      <>
        {creators.map((c, idx) => (
          <CreatorCard key={idx} {...c} />
        ))}
      </>
    )
  }


  return (
    <>
        <h1 className="section_heading"><span className="color_highlight">New</span> Travel influencers</h1>
        <div className="card_grid">
          {renderCreatorCards()}
        </div>
    </>
  )
}

export default NewCreators;
