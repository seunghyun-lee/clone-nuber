import { getRepository, Between } from "typeorm";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { GetNearbyRideResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";


const resolvers: Resolvers = {
    Query: {
        GetNearbyRide: privateResolver (
            async (_, __, { req }): Promise<GetNearbyRideResponse> => {
                const user: User = req.user;
                if (user.isDriving) {
                    const { lastLat, lastLng } = user;
                    try {
                        const ride = await getRepository(Ride).find({
                            status: "REQUESTING",
                            pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
                            pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
                        });
                        return {
                            ok: true,
                            error: null,
                            ride
                        };
                    } catch(error) {
                        return {
                            ok: false,
                            error: error.message,
                            ride: null                            
                        };
                    }
                } else {
                    return {
                        ok: false,
                        error: "You are not a driver",
                        ride: null
                    };
                }
            }
        )
    }
};

export default resolvers;