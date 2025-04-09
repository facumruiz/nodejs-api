import mongoose from 'mongoose';
const { Schema } = mongoose;

// Enum de posiciones válidas
const positionEnum = [
  'ST', 'LM', 'CM', 'RM', 'LB', 'CB', 'RB', 'GK',
  'CAM', 'LWB', 'RWB', 'CDM', 'LAM', 'RAM'
];

// Subesquema: Datos personales
const personalDataSchema = new Schema({
  name: { type: String, required: [true, 'El nombre es obligatorio'] },
  lastname: { type: String, required: [true, 'El apellido es obligatorio'] },
  dateOfBirth: { type: String, required: [true, 'La fecha de nacimiento es obligatoria'] },
  nationality: { type: String, required: [true, 'La nacionalidad es obligatoria'] },
  secondNationality: { type: String, default: null },
  personalId: { type: Number, required: [true, 'El documento es obligatorio'] },
  avatar: { type: String, default: '' },
  nickname: { type: String, default: null },
  clothesSize: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    required: [true, 'El talle de ropa es obligatorio'],
  },
  shirtNumber: { type: Number, required: [true, 'El número de camiseta es obligatorio'] },
  shirtName: { type: String, required: [true, 'El nombre de camiseta es obligatorio'] },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    match: [/.+\@.+\..+/, 'Formato de correo inválido'],
  },
  phoneNumber: { type: String, required: [true, 'El número de teléfono es obligatorio'] },
  children: { type: Number, required: true, min: [0, 'No puede tener un número negativo de hijos'] },
  maritalSituation: {
    type: String,
    enum: ['single', 'married', 'divorced'],
    required: [true, 'La situación marital es obligatoria'],
  },
});

// Subesquema: Atributos físicos
const physicalAttributesSchema = new Schema({
  height: { type: String, required: [true, 'La altura es obligatoria'] },
  weight: { type: String, required: [true, 'El peso es obligatorio'] },
  preferredFoot: {
    type: String,
    enum: ['left', 'right'],
    required: [true, 'El pie preferido es obligatorio'],
  },
});

// Subesquema: Contrato
const contractSchema = new Schema({
  startDate: String,
  endDate: String,
  grossSalary: String,
  socialSecurityNumber: String,
  benefits: {
    flightAllowance: String,
    individualApartment: String,
    sharedApartmentEstimate: String,
  },
  bonuses: {
    perGoal: String,
    perAssist: String,
    perCleanSheet: String,
  },
  releaseClause: String,
  marketValue: String,
  onLoan: { type: Boolean, default: false },
  agent: String,
});

// Subesquema: Historial médico
const medicalHistorySchema = new Schema({
  type: String,
  surgery: { type: Boolean, default: false },
  surgeryType: String,
  startDate: String,
  endDate: String,
  currentlyInjured: { type: Boolean, default: false },
});

// Subesquema: Atributos futbolísticos
const footballAttributesSchema = new Schema({
  firstPosition: {
    attack: [{ type: String, enum: positionEnum }],
    midfield: [{ type: String, enum: positionEnum }],
    wide: [{ type: String, enum: positionEnum }],
    defense: [{ type: String, enum: positionEnum }],
    goalkeeper: [{ type: String, enum: positionEnum }],
  },
  secondPosition: {
    attack: [{ type: String, enum: positionEnum }],
    midfield: [{ type: String, enum: positionEnum }],
    wide: [{ type: String, enum: positionEnum }],
    defense: [{ type: String, enum: positionEnum }],
    goalkeeper: [{ type: String, enum: positionEnum }],
  },
  thirdPosition: {
    attack: [{ type: String, enum: positionEnum }],
    midfield: [{ type: String, enum: positionEnum }],
    wide: [{ type: String, enum: positionEnum }],
    defense: [{ type: String, enum: positionEnum }],
    goalkeeper: [{ type: String, enum: positionEnum }],
  },
  goalkeeper: {
    reflexes: Number,
    oneOnOne: Number,
    aerialReach: Number,
    kicking: Number,
    footwork: Number,
    throwing: Number,
    wingspan: Number,
    shotStopping: Number,
    agility: Number,
  },
  defensive: {
    marking: Number,
    anticipation: Number,
    tackling: Number,
    aerialDuels: Number,
    positioning: Number,
    coverage: Number,
    oneVsOneDefending: Number,
    wideDuels: Number,
    counterPressing: Number,
  },
  offensive: {
    finishing: Number,
    dribbling: Number,
    shortPassing: Number,
    longPassing: Number,
    crossing: Number,
    vision: Number,
    longShots: Number,
    offTheBall: Number,
    ballProgression: Number,
    projection: Number,
    switchesOfPlay: Number,
    playmaking: Number,
    throughBalls: Number,
    oneVsOneAttacking: Number,
    backToGoalPlay: Number,
    heading: Number,
    insideTheBoxFinishing: Number,
  },
  physical: {
    pace: Number,
    acceleration: Number,
    strength: Number,
    power: Number,
    stamina: Number,
    jumping: Number,
    agility: Number,
    wingspan: Number,
    coordination: Number,
  },
  mental: {
    ambition: Number,
    leadership: Number,
    winningMentality: Number,
    decisionMaking: Number,
    concentration: Number,
    tacticalIntelligence: Number,
    composure: Number,
    adaptability: Number,
    emotionalBalance: Number,
    authority: Number,
    creativity: Number,
  },
});

// Esquema principal: Jugador de club
const clubPlayerSchema = new Schema({
  personalData: personalDataSchema,
  physicalAttributes: physicalAttributesSchema,
  contract: contractSchema,
  footballAttributes: footballAttributesSchema,
  medicalHistory: [medicalHistorySchema],
}, { timestamps: true });

const ClubPlayer = mongoose.model('ClubPlayer', clubPlayerSchema);

export default ClubPlayer;
