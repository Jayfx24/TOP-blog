import { useLoaderData } from "react-router";
import type { articlesLoader } from "../../loaders";
import { ArticleList } from "../../components/article-list/article-list";
import styles from "./home.module.css"
export function Home(){
  const posts = useLoaderData<typeof articlesLoader>();
    

  return(
    <section className={styles.base} >

        <div className="wrapper">
            <div className={styles.hero}>
                <div className={styles.badge}>My Journal</div>
                <h1 className={styles.title} >Inside designs: Stories</h1>
                <p className={styles.desc}>Subscribe for the latest design trends. design software releases. exclusive interviews with design leaders.</p>
            </div>
        </div>
        <ArticleList articles={posts}/>
    </section>
  )
    
}