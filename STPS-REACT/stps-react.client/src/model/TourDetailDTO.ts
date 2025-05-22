export class TourDetailDTO {
    tourName?: string;
    description?: string;

    constructor(tourName: string = "Tour mặc định", description: string = "Mô tả mặc định") {
        this.tourName = tourName;
        this.description = description;
    }
}