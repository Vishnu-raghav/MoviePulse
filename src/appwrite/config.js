import conf from "../conf/conf";
import { Client,ID,Databases,Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async addToWatchList({title,movieId,userId,Poster}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    movieId,
                    userId,
                    Poster,

                }
            )
        } catch (error) {
            console.error("Error adding movie to watchlist:", error);
        }
    }

    async removeToWatchList(documentID){
       try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            documentID
        )
        return true
       } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
       }
    }

    async getWatchList(userId){
          try {
            const queries = [Query.equal('userId', userId)];
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
          } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
          }
    }
}

const service = new Service()
export default service