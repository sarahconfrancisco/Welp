import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import ErrorReducer from './error_reducer';
import RestaurantReducer from './restaurant_reducer';
import ReviewReducer from './review_reducer';
import ImageReducer from './image_reducer';
import SearchReducer from './search_reducer';
import LoadingReducer from './loading_reducer';

const RootReducer = combineReducers({
  currentUser: SessionReducer,
  errors: ErrorReducer,
  restaurant: RestaurantReducer,
  reviewIndex: ReviewReducer,
  search: SearchReducer,
  loading: LoadingReducer,
  images: ImageReducer
});

export default RootReducer;
