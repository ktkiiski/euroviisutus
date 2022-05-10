import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

export default class Converter<Data extends DocumentData> implements FirestoreDataConverter<Data> {
  toFirestore({ id, ...contest }: Data): DocumentData {
    return contest;
  }

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Data {
    const data = snapshot.data(options)!;
    return { ...data, id: snapshot.id } as unknown as Data;
  }
}
