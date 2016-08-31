
myApp.controller("petController", ["$scope","$http", "DataFactory", function($scope, $http, DataFactory) {

  var key = '91fb1669a6ccd1c0db0668184a0df9f6';
  var baseURL = 'http://api.petfinder.com/';

 //Dropdown Menu
 $scope.types = [
   {type: "barnyard", name: "Barn Yard Buddies"},
   {type: "bird", name: "Birds"},
   {type: "cat", name: "Cats"},
   {type: "dog", name: "Dogs"},
   {type: "horse", name: "Horses"},
   {type: "pig", name: "Pigs"},
   {type: "reptile", name: "Reptiles"},
   {type: "smallfurry", name: "Rodents"}
 ];


$scope.dataFactory = DataFactory;
$scope.getFavs = $scope.dataFactory.retrieveData;
//$scope.getFavs();
$scope.favs = $scope.dataFactory.favsArray;
$scope.favoriteCount = $scope.dataFactory.count;

console.log($scope.getFavs);
//$scope.getFavs();
console.log($scope.favs);
 //$scope.favs = [];
 //var currentPet = {};
 //getFavs();

/*
function getFavs() {
  $http.get('/pets')
  .then(function (response) {
    response.data.forEach(function (pet) {
    });
    $scope.favs = response.data;
    $scope.favoriteCount = $scope.favs.length;
  });
}
*/

/*
$scope.addFavs = function () {
  currentPet.petID = $scope.pet.id.$t;
  currentPet.petName = $scope.pet.name.$t;
  currentPet.imageURL = $scope.pet.media.photos.photo[2].$t;
  if($scope.pet.description.$t !== undefined) {
  currentPet.description = $scope.pet.description.$t.substring(0, 100);
} else {
  currentPet.description = "No description available.";
}

  $http.post('/pets', currentPet)
  .then(function () {
    getFavs();
  });
};
*/

//Adds favorite to the DB then reloads data from factory
$scope.addFavs = function() {
  console.log('Adding a fav');
  $scope.dataFactory.addFaves($scope.pet.id.$t, $scope.pet.name.$t, $scope.pet.media.photos.photo[2].$t, $scope.pet.description.$t.substring(0, 100))
  .then(function(response) {
  console.log("IT WORKED");
  $scope.favs = $scope.dataFactory.petData();
});

}
/*
$scope.deleteFav = function(id) {

  if(confirm("Are you sure you want to delete this item?")){
    $http.delete('/pets/' + id)
    .then(function(response) {
      getFavs();
    });
  }
}
*/

//DON'T TOUCH
  $scope.getRandomPet = function() {
    var query = baseURL + 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + $scope.selectedType.type;
    query += '&output=basic';
    query += '&format=json';

    console.log('query: ', query);

    var request = encodeURI(query) + '&callback=JSON_CALLBACK';

 $http.jsonp(request).then(function(response) {
   $scope.pet = response.data.petfinder.pet;

 });
  }
}])
