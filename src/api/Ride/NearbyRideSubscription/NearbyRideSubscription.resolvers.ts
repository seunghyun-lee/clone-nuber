import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
    Subscription: {
        NearbyRideSubsctiption: {
            subscribe: withFilter(
                (_, __, { pubSub }) => pubSub.asyncIterator("rideRequest"),
                (patload, _, { context }) => {
                    const user: User = context.currentUser;
                    const {
                        NearbyRideSubsctiption: { pickUpLat, pickUpLng }
                    } = payload;
                    const { lastLat: userLastLat, lastLng: userLastLng } = user;
                    return {
                        pickUpLat >= userLastLat - 0.05 &&
                        pickUpLat <= userLastLat + 0.05 &&
                        pickUpLng >= userLastLng - 0.05 &&
                        pickUpLng <= userLastLng + 0.05
                    };
                }
            )
        }
    }
}

export default resolvers;