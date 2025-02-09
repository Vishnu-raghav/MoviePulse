import conf from "../conf/conf";
import { Client, ID, Databases, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async addToWatchList({ title, movieId, userId, poster }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          movieId,
          userId,
          poster,
        }
      );
    } catch (error) {
      return null;
    }
  }

  async removeFromWatchList(documentID) {
    try {  
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentID
      );
  
      return true;
    } catch (error) {
      return false;
    }
  }
  

  async getWatchList(userId) {
    try {
      
      const queries = [Query.equal("userId", userId)];
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
  
      return response; 
    } catch (error) {
      return { documents: [] }; 
    }
  }
  
  
}

const service = new Service();
export default service;
