export interface int_ForumMessage {
ForumId :number,
	UserId : number
	Date: Date
	ParentForumId :number
	Title :string
	Message :string
	ForumTypeId :number
	// AboutGuideId int constraint FK_Forum_AboutGuideId 
	// 					foreign key references Guides(GuideId),
	// AboutWalkingTrailId int constraint FK_Forum_WalkingTrail 
	// 					foreign key references WalkingTrail(WalkingTrailId),
	// AboutAttractionsId int constraint FK_Forum_AttractionsId 
	// 					foreign key references Attractions(AttractionsId),
	// AboutHostelsId int constraint FK_Forum_HostelsId 
	// 					foreign key references Hostels(HostelsId),
}
