export interface PostProps {
  id?: string;
  name: string;
  scientificName?: string;
  sighting: string;
  sightingDate: Date;
  sightingHour: string;
  observation?: string;
  img: string;
}

export class PostEntity {
  id?: string;
  name: string;
  scientificName?: string;
  sighting: string;
  sightingDate: Date;
  sightingHour: string;
  observation?: string;
  img: string;
  constructor(props: PostProps) {
    this.id = props.id;
    this.name = props.name;
    this.scientificName = props.scientificName;
    this.sighting = props.sighting;
    this.sightingDate = props.sightingDate;
    this.sightingHour = props.sightingHour;
    this.observation = props.observation;
    this.img = props.img;
  }
}
