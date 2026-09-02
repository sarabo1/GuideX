

export interface Int_WalkingTrail {
   
   WalkingTrailId : number;
   WalkingTrailName : string;
   Description : string;
   regionId : number;
   Directions : string;
   LengthInKm : number;
   RouteDuration : number;
   Difficulty : number;
   MinAge : number;
   MaxAge : number;
   IsWet : boolean;
 
    SeasonSummer: boolean;
    SeasonWinter: boolean;
    SeasonSpring: boolean;
    SeasonAutumn: boolean;
  }
