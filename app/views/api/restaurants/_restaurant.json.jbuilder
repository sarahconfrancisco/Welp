json.extract! restaurant, :id, :name, :address, :city, :state, :zip, :phone, :website, :price, :rating, :num_reviews, :latitude, :longitude
json.types do
  json.array! restaurant.types.map { |t| t.name }
end