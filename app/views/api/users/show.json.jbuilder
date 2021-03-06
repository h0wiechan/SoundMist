# json.partial! "api/users/user", user: @user
defaultState = {}
defaultArr = []

json.set! :individualUser do
    json.set! @user.id do
        json.id @user.id
        json.username @user.username
        # json.imageURL @user.image_url
        if @user.attentions.length === 0
            json.attentions defaultState
        else
            json.set! :attentions do
                @user.attentions.each do |attention|
                    json.set! attention.follower_id do
                        json.id attention.id
                        json.followedUserId attention.followed_user_id
                        json.followerId attention.follower_id
                    end
                end
            end
        end
        if @user.followers.length === 0
            json.followers defaultState
        else
            json.set! :followers do
                @user.followers.each do |follower|
                    json.set! follower.id do
                        json.id follower.id
                        json.username follower.username
                    end
                end
            end
        end
        if @liked_songs_of_user.length === 0
            json.likedSongs defaultState
        else
            json.set! :likedSongs do
                @liked_songs_of_user.each do |song|
                    json.set! song.id do
                        json.id song.id
                        json.title song.title
                        json.genre song.genre
                        json.description song.description
                        json.availability song.availability
                        json.artist song.artist.username
                        json.artistId song.artist.id
                        json.imageURL song.image_url
                        json.audioURL song.audio_url
                        json.likesCount song.likes_count
                        json.commentsCount song.comments_count
                        json.createdAt song.created_at
                    end
                end
            end
        end
        json.followersCount @user.followers_count
        json.followingsCount @user.followings_count
        json.songsCount @user.songs_count
    end
end