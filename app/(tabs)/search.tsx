import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'

const Search = () => {

  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: movies, 
    loading, 
    error,
    refetch: loadMovies,
    reset,
    } = useFetch(() => fetchMovies({ 
      query: '' 
    }), false);

  useEffect(() => {
    const func = async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }
    func();
  }, [searchQuery.trim()]);
  

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode='cover'/>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item } />}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{ 
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{paddingBottom: 100}}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row items-center justify-center mt-20 item-center'>
            <Image source={icons.logo} className='w-12 h-10'/>
            </View>

            <View className='my-5'>
              <SearchBar 
                placeholder="Search movies ..."
                value={searchQuery}
                onChangeText={(text: string)=> setSearchQuery(text)}
                onPress={() => {}}
              />
            </View>

            {loading && (
              <ActivityIndicator size="large" color="#0000ff" className='my-3' />
            )}

            {error && (
              <Text className='text-red-500 px-5 my-3'>Error: {error.message}</Text>
            )}

            {
            !loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className='text-xl text-white font-bold'>
                  {' '}
                <Text className='text-accent'>{searchQuery}</Text>
              </Text>
            ) }
          </>
        }
      />
    </View>
  )
}

export default Search