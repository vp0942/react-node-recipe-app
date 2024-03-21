import {Recipe} from "../types.ts";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";

interface Props {
  recipe: Recipe;
  isFavourite: boolean;
  onClick: () => void;
  onFavouriteButtonClick: (recipe: Recipe) => void;
}

const RecipeCard = ({recipe, onClick, onFavouriteButtonClick, isFavourite}: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} alt={recipe.title}/>
      <div className="recipe-card-title">
        <span onClick={(e) => {
          // Prevent the click event from bubbling up to the parent element
          // This will prevent the recipe card from being clicked when the favourite button is clicked
          e.stopPropagation();
          onFavouriteButtonClick(recipe);
        }}>
          {isFavourite ? <AiFillHeart size={25} color="red"/> : <AiOutlineHeart size={25}/>}
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  )

}

export default RecipeCard;