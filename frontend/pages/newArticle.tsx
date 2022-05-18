import { StringValueNode } from "graphql";
import { ChangeEvent, FormEvent, SyntheticEvent, useContext } from "react";
import { CurrProfileContext } from "../context/userContext";
import { storeNewArticleDataFromForm } from "../dbLogic/postArticle";
import styles from "../styles/newArticle.module.css";

function NewArticle() {
    let articleImg: string;
    const [currProfile, setCurrProfile] = useContext(CurrProfileContext);

    const previewImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files) {
            const image: HTMLImageElement = document.getElementById(
                "articleImg"
            )
                ? (document.getElementById("articleImg") as HTMLImageElement)
                : document.createElement("img");
            image.id = "articleImg";
            image.src = URL.createObjectURL(event.currentTarget.files[0]);
            console.log("imgSrc", image.src);
            articleImg = image.src;
            image.style.maxWidth = "100%";
            document.getElementById("imageContainer")?.appendChild(image);
        }
    };

    const handleArticleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        storeNewArticleDataFromForm(event, articleImg, currProfile);
    };

    return (
        <div className={styles.globalContainer}>
            <form className={styles.articleForm} onSubmit={handleArticleSubmit}>
                <h1 className={styles.title}>Write a new article</h1>
                <div
                    className={`${styles.divContainer} ${styles.detailsContainer}`}
                >
                    <label htmlFor="title">Article title</label>
                    <input
                        type="text"
                        id="title"
                        className={styles.input}
                    ></input>
                    <label htmlFor="category">Category</label>
                    <select id="category" className={styles.input}>
                        <option value="placeholder1">placeholder1</option>
                        <option value="placeholder2">placeholder2</option>
                        <option value="placeholder3">placeholder3</option>
                        <option value="placeholder4">placeholder4</option>
                    </select>
                    <div
                        className={styles.imageSelectionContainer}
                        id="imageContainer"
                    >
                        <label htmlFor="image">Image </label>
                        <input
                            type="file"
                            accept="image/jpg, image/png, image/jpeg"
                            className={styles.input}
                            onChange={previewImage}
                        ></input>
                    </div>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            className={styles.input}
                        ></input>
                </div>
                <div
                    className={`${styles.divContainer} ${styles.articleContentContainer}`}
                >
                    <label htmlFor="articleContent">Article content</label>
                    <textarea
                        className={`${styles.input} ${styles.articleText}`}
                        id="articleContent"
                    ></textarea>
                </div>
                <div className={styles.articleSubmitContainer}>
                    <button type="submit" className={styles.button}>
                        Publish
                    </button>
                    <button type="submit" className={styles.button}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NewArticle;
